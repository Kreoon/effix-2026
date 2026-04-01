"""
Build Customer Match CSV for Google Ads - Feria Effix 2026
Reads 3 Excel sources, cleans, deduplicates, outputs Google Ads-ready CSV.
Plain text output (Google handles hashing on upload).
"""
import pandas as pd
import re

# --- Country code mapping for E.164 ---
COUNTRY_CODES = {
    'colombia': '57',
    'ecuador': '593',
    'estados unidos': '1',
    'perú': '51',
    'peru': '51',
    'república dominicana': '1',
    'republica dominicana': '1',
    'guatemala': '502',
    'panamá': '507',
    'panama': '507',
    'méxico': '52',
    'mexico': '52',
    'singapur': '65',
    'emiratos árabes unidos': '971',
    'uruguay': '598',
    'chile': '56',
    'españa': '34',
    'espana': '34',
    'argentina': '54',
    'hong kong': '852',
    'venezuela': '58',
    'bulgaria': '359',
    'países bajos (holanda)': '31',
    'paises bajos (holanda)': '31',
    'brasil': '55',
    'costa rica': '506',
    'bolivia': '591',
    'paraguay': '595',
    'el salvador': '503',
    'honduras': '504',
    'nicaragua': '505',
}


def clean_phone(phone_raw, country_code='57'):
    """Clean phone number to E.164 format."""
    if pd.isna(phone_raw) or str(phone_raw).strip() == '':
        return ''

    # Convert to string, remove decimals from float
    phone = str(phone_raw).strip()
    if phone.endswith('.0'):
        phone = phone[:-2]

    # Remove all non-digit characters except leading +
    phone = re.sub(r'[^\d+]', '', phone)
    if not phone:
        return ''

    # Already has + prefix
    if phone.startswith('+'):
        return phone

    # Already starts with country code (e.g. 573... for Colombia)
    if phone.startswith('57') and len(phone) >= 12 and country_code == '57':
        return '+' + phone

    # Colombian mobile: starts with 3, 10 digits
    if country_code == '57' and phone.startswith('3') and len(phone) == 10:
        return '+57' + phone

    # Colombian landline: 7 digits
    if country_code == '57' and len(phone) == 7:
        return '+57' + phone

    # Generic: if phone looks like it already includes country code (long enough)
    if len(phone) > 10:
        return '+' + phone

    # Fallback: prepend country code
    return '+' + country_code + phone


def proper_case(name):
    """Convert to proper case, handling NaN."""
    if pd.isna(name) or str(name).strip() == '':
        return ''
    return str(name).strip().title()


def split_full_name(full_name):
    """Split a full name into first and last. Heuristic: first word = first name, rest = last name."""
    if pd.isna(full_name) or str(full_name).strip() == '':
        return '', ''
    parts = str(full_name).strip().split()
    if len(parts) == 1:
        return parts[0], ''
    return parts[0], ' '.join(parts[1:])


# ============================================================
# SOURCE 1: Clientes directos de Effix
# ============================================================
print("=" * 60)
print("SOURCE 1: Bd clientes directos de Effix para Google Ads.xlsx")
print("=" * 60)

df1 = pd.read_excel(r"C:\Users\EffiCommerce\Documents\Bd clientes directos de Effix para Google Ads.xlsx")

# Split Nombre into First/Last
df1[['FirstName', 'LastName']] = df1['Nombre'].apply(
    lambda x: pd.Series(split_full_name(x))
)

# Pick best phone: Celular > WhatsApp > Teléfono 1
df1['Phone_raw'] = df1['Celular'].fillna(df1['WhatsApp']).fillna(df1.iloc[:, 0])  # Teléfono 1

# Map country to code
df1['CountryCode'] = df1['País'].str.lower().str.strip().map(COUNTRY_CODES).fillna('57')

records1 = pd.DataFrame({
    'Email': df1['Email'].str.strip().str.lower(),
    'Phone': [clean_phone(p, cc) for p, cc in zip(df1['Phone_raw'], df1['CountryCode'])],
    'First Name': df1['FirstName'].apply(proper_case),
    'Last Name': df1['LastName'].apply(proper_case),
    'Country': df1['País'].apply(proper_case),
})

print(f"Total rows: {len(records1)}")
print(f"Rows with email: {records1['Email'].notna().sum() - (records1['Email'] == '').sum()}")
print(f"Rows with phone: {(records1['Phone'] != '').sum()}")

# ============================================================
# SOURCE 2: Boletería consolidada 2021-2025
# ============================================================
print("\n" + "=" * 60)
print("SOURCE 2: bd consolidada boleteria 2021-2025.xlsx")
print("=" * 60)

df2 = pd.read_excel(r"C:\Users\EffiCommerce\Documents\bd consolidada boleteria 2021-2025.xlsx")

# Pick best phone: Celular > Teléfono
df2['Phone_raw'] = df2['Celular'].fillna(df2['Teléfono'])

records2 = pd.DataFrame({
    'Email': df2['Correo electrónico'].str.strip().str.lower(),
    'Phone': [clean_phone(p, '57') for p in df2['Phone_raw']],
    'First Name': df2['Nombre'].apply(proper_case),
    'Last Name': df2['Apellido'].apply(proper_case),
    'Country': 'Colombia',  # Boletería is all Colombian
})

print(f"Total rows: {len(records2)}")
print(f"Rows with email: {(records2['Email'].notna() & (records2['Email'] != '')).sum()}")
print(f"Rows with phone: {(records2['Phone'] != '').sum()}")

# ============================================================
# SOURCE 3: Empresas
# ============================================================
print("\n" + "=" * 60)
print("SOURCE 3: empresas.xlsx")
print("=" * 60)

df3 = pd.read_excel(r"C:\Users\EffiCommerce\Documents\empresas.xlsx")

# This file has up to 3 emails per row. We'll take e-mail1 as primary.
# No name columns - just email and phone. cel1 > cel2
df3['Phone_raw'] = df3['cel1'].fillna(df3['cel2'])

records3 = pd.DataFrame({
    'Email': df3['e-mail1'].str.strip().str.lower(),
    'Phone': [clean_phone(p, '57') for p in df3['Phone_raw']],
    'First Name': '',
    'Last Name': '',
    'Country': 'Colombia',  # empresas colombianas
})

# Also extract unique emails from e-mail2 that differ from e-mail1
df3['_e1_clean'] = df3['e-mail1'].str.strip().str.lower()
df3['_e2_clean'] = df3['e-mail2'].str.strip().str.lower()
mask = (df3['_e2_clean'].notna()) & (df3['_e2_clean'] != '') & (df3['_e2_clean'] != df3['_e1_clean'])
extra_unique = df3.loc[mask, ['_e2_clean', 'cel2']].copy()
extra_unique.columns = ['email', 'phone']

records3_extra = pd.DataFrame({
    'Email': extra_unique['email'].values,
    'Phone': [clean_phone(p, '57') for p in extra_unique['phone']],
    'First Name': '',
    'Last Name': '',
    'Country': 'Colombia',
})

records3_all = pd.concat([records3, records3_extra], ignore_index=True)

print(f"Total rows (e-mail1): {len(records3)}")
print(f"Extra from e-mail2 (unique): {len(records3_extra)}")
print(f"Total rows combined: {len(records3_all)}")
print(f"Rows with email: {(records3_all['Email'].notna() & (records3_all['Email'] != '')).sum()}")
print(f"Rows with phone: {(records3_all['Phone'] != '').sum()}")

# ============================================================
# CONSOLIDATE & DEDUPLICATE
# ============================================================
print("\n" + "=" * 60)
print("CONSOLIDATION")
print("=" * 60)

all_records = pd.concat([records1, records2, records3_all], ignore_index=True)
print(f"Total records before dedup: {len(all_records)}")

# Remove rows with no email (can't match without it)
all_records = all_records[all_records['Email'].notna() & (all_records['Email'] != '')]
print(f"After removing empty emails: {len(all_records)}")

# Remove obviously invalid emails
all_records = all_records[all_records['Email'].str.contains('@', na=False)]
print(f"After removing invalid emails (no @): {len(all_records)}")

# Deduplicate by email (keep first occurrence - prioritizes source 1 > 2 > 3)
# But prefer rows that have more data (name, phone)
all_records['_score'] = (
    (all_records['First Name'] != '').astype(int) +
    (all_records['Last Name'] != '').astype(int) +
    (all_records['Phone'] != '').astype(int)
)
all_records = all_records.sort_values('_score', ascending=False)
deduped = all_records.drop_duplicates(subset='Email', keep='first').drop(columns='_score')
dupes_removed = len(all_records) - len(deduped)
print(f"Duplicates removed: {dupes_removed}")
print(f"Final record count: {len(deduped)}")

# Sort by email
deduped = deduped.sort_values('Email').reset_index(drop=True)

# Output
output_path = r"C:\Users\EffiCommerce\effix-2026\assets\customer-match-boletas.csv"
deduped.to_csv(output_path, index=False, encoding='utf-8-sig')
print(f"\nCSV written to: {output_path}")

# Show first 5 rows
print("\n" + "=" * 60)
print("FIRST 10 ROWS OF OUTPUT:")
print("=" * 60)
print(deduped.head(10).to_string())

# Summary stats
print("\n" + "=" * 60)
print("SUMMARY STATS:")
print("=" * 60)
print(f"Records from Source 1 (Clientes directos): {len(records1)}")
print(f"Records from Source 2 (Boletería 2021-2025): {len(records2)}")
print(f"Records from Source 3 (Empresas): {len(records3_all)}")
print(f"Total before dedup: {len(records1) + len(records2) + len(records3_all)}")
print(f"Removed (empty/invalid email): {len(records1) + len(records2) + len(records3_all) - len(all_records)}")
print(f"Duplicates removed: {dupes_removed}")
print(f"Final unique records: {len(deduped)}")
print(f"Records with phone: {(deduped['Phone'] != '').sum()}")
print(f"Records with first name: {(deduped['First Name'] != '').sum()}")
print(f"Records with country: {(deduped['Country'] != '').sum()}")
