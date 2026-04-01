"""Generate professional PDFs from Fase 1, 2, 3 markdown guides."""
import re
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.platypus.flowables import Flowable

# Colors
GOLD = HexColor("#C9A84C")
DARK_BG = HexColor("#1A1A1A")
BLACK = HexColor("#000000")
CREAM = HexColor("#F0EDE8")
SILVER = HexColor("#B8B8B8")
RED = HexColor("#C0392B")
WHITE = HexColor("#FFFFFF")
LIGHT_GRAY = HexColor("#F5F5F5")
MID_GRAY = HexColor("#E0E0E0")
DARK_GRAY = HexColor("#333333")

class GoldHeader(Flowable):
    """Dark header bar with gold accent."""
    def __init__(self, text, width=None):
        Flowable.__init__(self)
        self.text = text
        self._width = width or 7.5 * inch
        self.height = 0.5 * inch

    def draw(self):
        self.canv.setFillColor(DARK_BG)
        self.canv.roundRect(0, 0, self._width, self.height, 4, fill=1, stroke=0)
        self.canv.setFillColor(GOLD)
        self.canv.rect(0, 0, 4, self.height, fill=1, stroke=0)
        self.canv.setFont("Helvetica-Bold", 13)
        self.canv.setFillColor(WHITE)
        self.canv.drawString(16, self.height/2 - 5, self.text)


class GoldLine(Flowable):
    """Thin gold separator line."""
    def __init__(self, width=None):
        Flowable.__init__(self)
        self._width = width or 7.5 * inch
        self.height = 2

    def draw(self):
        self.canv.setStrokeColor(GOLD)
        self.canv.setLineWidth(1.5)
        self.canv.line(0, 0, self._width, 0)


def create_styles():
    """Create custom paragraph styles."""
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        'DocTitle', parent=styles['Title'],
        fontSize=22, textColor=DARK_GRAY,
        spaceAfter=6, fontName='Helvetica-Bold',
        alignment=TA_LEFT
    ))
    styles.add(ParagraphStyle(
        'DocSubtitle', parent=styles['Normal'],
        fontSize=11, textColor=SILVER,
        spaceAfter=16, fontName='Helvetica'
    ))
    styles.add(ParagraphStyle(
        'H1Gold', parent=styles['Heading1'],
        fontSize=18, textColor=DARK_GRAY,
        spaceBefore=20, spaceAfter=8,
        fontName='Helvetica-Bold'
    ))
    styles.add(ParagraphStyle(
        'H2Dark', parent=styles['Heading2'],
        fontSize=14, textColor=DARK_GRAY,
        spaceBefore=16, spaceAfter=6,
        fontName='Helvetica-Bold'
    ))
    styles.add(ParagraphStyle(
        'H3Sub', parent=styles['Heading3'],
        fontSize=12, textColor=HexColor("#555555"),
        spaceBefore=12, spaceAfter=4,
        fontName='Helvetica-Bold'
    ))
    styles.add(ParagraphStyle(
        'BodyText2', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK_GRAY,
        spaceBefore=3, spaceAfter=3,
        fontName='Helvetica', leading=13
    ))
    styles.add(ParagraphStyle(
        'CodeBlock', parent=styles['Normal'],
        fontSize=8.5, textColor=DARK_GRAY,
        fontName='Courier', leading=11,
        leftIndent=12, backColor=LIGHT_GRAY,
        borderPadding=6, spaceBefore=4, spaceAfter=4
    ))
    styles.add(ParagraphStyle(
        'BulletCustom', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK_GRAY,
        fontName='Helvetica', leading=13,
        leftIndent=20, bulletIndent=8,
        spaceBefore=2, spaceAfter=2
    ))
    styles.add(ParagraphStyle(
        'CheckItem', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK_GRAY,
        fontName='Helvetica', leading=13,
        leftIndent=20, spaceBefore=1, spaceAfter=1
    ))
    styles.add(ParagraphStyle(
        'GoldNote', parent=styles['Normal'],
        fontSize=9, textColor=HexColor("#8B7A3A"),
        fontName='Helvetica-Oblique', leading=12,
        leftIndent=12, spaceBefore=4, spaceAfter=4,
        borderColor=GOLD, borderWidth=0.5,
        borderPadding=8, backColor=HexColor("#FFFDF5")
    ))
    styles.add(ParagraphStyle(
        'Footer', parent=styles['Normal'],
        fontSize=7.5, textColor=SILVER,
        fontName='Helvetica', alignment=TA_CENTER
    ))
    return styles


def parse_md_table(lines):
    """Parse markdown table lines into list of lists."""
    rows = []
    for line in lines:
        line = line.strip()
        if line.startswith('|') and not re.match(r'^\|[\s\-:|]+\|$', line):
            cells = [c.strip() for c in line.split('|')[1:-1]]
            rows.append(cells)
    return rows


def make_table(rows, styles, col_widths=None):
    """Create a styled table from rows."""
    if not rows or len(rows) < 1:
        return None

    # Convert to Paragraphs for word wrap
    style_header = ParagraphStyle('TH', parent=styles['Normal'],
        fontSize=8.5, textColor=WHITE, fontName='Helvetica-Bold', leading=11)
    style_cell = ParagraphStyle('TD', parent=styles['Normal'],
        fontSize=8.5, textColor=DARK_GRAY, fontName='Helvetica', leading=11)

    data = []
    for i, row in enumerate(rows):
        if i == 0:
            data.append([Paragraph(c, style_header) for c in row])
        else:
            data.append([Paragraph(c, style_cell) for c in row])

    ncols = len(data[0]) if data else 1
    if not col_widths:
        available = 7.2 * inch
        col_widths = [available / ncols] * ncols

    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK_BG),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, MID_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    return t


def header_footer(canvas, doc, title, fase_num):
    """Draw header and footer on each page."""
    canvas.saveState()
    # Header line
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(2)
    canvas.line(0.75*inch, letter[1] - 0.5*inch, letter[0] - 0.75*inch, letter[1] - 0.5*inch)
    # Header text
    canvas.setFont('Helvetica-Bold', 8)
    canvas.setFillColor(GOLD)
    canvas.drawString(0.75*inch, letter[1] - 0.45*inch, f"FERIA EFFIX 2026 — GOOGLE ADS FASE {fase_num}")
    canvas.setFillColor(SILVER)
    canvas.setFont('Helvetica', 7)
    canvas.drawRightString(letter[0] - 0.75*inch, letter[1] - 0.45*inch, f"Cuenta: 356-853-8992")
    # Footer
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(SILVER)
    canvas.drawString(0.75*inch, 0.4*inch, "Feria Effix 2026 — Estrategia Google Ads")
    canvas.drawRightString(letter[0] - 0.75*inch, 0.4*inch, f"Pagina {doc.page}")
    # Gold footer line
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.5)
    canvas.line(0.75*inch, 0.55*inch, letter[0] - 0.75*inch, 0.55*inch)
    canvas.restoreState()


def md_to_story(md_text, styles):
    """Convert markdown text to reportlab story elements."""
    story = []
    lines = md_text.split('\n')
    i = 0
    in_code = False
    code_lines = []
    in_table = False
    table_lines = []

    # Skip YAML frontmatter at the very beginning only
    frontmatter_skipped = False
    if i < len(lines) and lines[i].strip() == '---':
        i += 1
        while i < len(lines) and lines[i].strip() != '---':
            i += 1
        i += 1  # skip closing ---
        frontmatter_skipped = True

    while i < len(lines):
        line = lines[i]

        # Code blocks
        if line.strip().startswith('```'):
            if in_code:
                code_text = '\n'.join(code_lines)
                code_text = code_text.replace('<', '&lt;').replace('>', '&gt;')
                story.append(Paragraph(code_text.replace('\n', '<br/>'), styles['CodeBlock']))
                code_lines = []
                in_code = False
            else:
                # Flush table if pending
                if in_table and table_lines:
                    rows = parse_md_table(table_lines)
                    if rows:
                        t = make_table(rows, styles)
                        if t:
                            story.append(t)
                            story.append(Spacer(1, 6))
                    table_lines = []
                    in_table = False
                in_code = True
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        # Tables
        if line.strip().startswith('|'):
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(line)
            i += 1
            continue
        elif in_table:
            rows = parse_md_table(table_lines)
            if rows:
                t = make_table(rows, styles)
                if t:
                    story.append(t)
                    story.append(Spacer(1, 6))
            table_lines = []
            in_table = False

        stripped = line.strip()

        # Empty lines
        if not stripped:
            story.append(Spacer(1, 4))
            i += 1
            continue

        # Headers
        if stripped.startswith('# ') and not stripped.startswith('## '):
            text = stripped[2:].strip()
            story.append(Paragraph(text, styles['DocTitle']))
            story.append(GoldLine())
            story.append(Spacer(1, 8))
            i += 1
            continue

        if stripped.startswith('## '):
            text = stripped[3:].strip()
            story.append(Spacer(1, 8))
            story.append(GoldHeader(text))
            story.append(Spacer(1, 8))
            i += 1
            continue

        if stripped.startswith('### '):
            text = stripped[4:].strip()
            story.append(Paragraph(text, styles['H2Dark']))
            i += 1
            continue

        if stripped.startswith('#### '):
            text = stripped[5:].strip()
            story.append(Paragraph(text, styles['H3Sub']))
            i += 1
            continue

        # Blockquotes / notes
        if stripped.startswith('>'):
            text = stripped[1:].strip()
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            story.append(Paragraph(text, styles['GoldNote']))
            i += 1
            continue

        # Checklists
        if stripped.startswith('- [ ]') or stripped.startswith('- [x]'):
            checked = stripped.startswith('- [x]')
            text = stripped[5:].strip()
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            marker = "☑" if checked else "☐"
            story.append(Paragraph(f"{marker}  {text}", styles['CheckItem']))
            i += 1
            continue

        # Bullet points
        if stripped.startswith('- ') or stripped.startswith('* '):
            text = stripped[2:].strip()
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            text = re.sub(r'`(.*?)`', r'<font face="Courier" size="8">\1</font>', text)
            story.append(Paragraph(f"●  {text}", styles['BulletCustom']))
            i += 1
            continue

        # Numbered lists
        m = re.match(r'^(\d+)\.\s+(.*)', stripped)
        if m:
            num = m.group(1)
            text = m.group(2)
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            text = re.sub(r'`(.*?)`', r'<font face="Courier" size="8">\1</font>', text)
            story.append(Paragraph(f"<b>{num}.</b>  {text}", styles['BulletCustom']))
            i += 1
            continue

        # Horizontal rules
        if stripped in ('---', '***', '___'):
            story.append(Spacer(1, 6))
            story.append(HRFlowable(width="100%", color=MID_GRAY, thickness=0.5))
            story.append(Spacer(1, 6))
            i += 1
            continue

        # Regular paragraph
        text = stripped
        text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
        text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
        text = re.sub(r'`(.*?)`', r'<font face="Courier" size="8">\1</font>', text)
        # Warning emoji
        text = text.replace('⚠️', '<font color="#C0392B"><b>⚠</b></font>')
        text = text.replace('❌', '<font color="#C0392B">✗</font>')
        text = text.replace('✅', '<font color="#25D366">✓</font>')
        story.append(Paragraph(text, styles['BodyText2']))
        i += 1

    # Flush remaining table
    if in_table and table_lines:
        rows = parse_md_table(table_lines)
        if rows:
            t = make_table(rows, styles)
            if t:
                story.append(t)

    return story


def generate_pdf(md_path, pdf_path, fase_num):
    """Generate a PDF from a markdown file."""
    print(f"Reading {md_path}...")
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    styles = create_styles()
    story = md_to_story(md_text, styles)

    def on_page(canvas, doc):
        header_footer(canvas, doc, "", fase_num)

    print(f"Generating {pdf_path}...")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        topMargin=0.75*inch,
        bottomMargin=0.75*inch,
        leftMargin=0.75*inch,
        rightMargin=0.75*inch
    )
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    size = os.path.getsize(pdf_path)
    print(f"  -> {pdf_path} ({size:,} bytes)")


if __name__ == '__main__':
    base = r"C:\Users\EffiCommerce\Documents\GitHub\effix-2026"
    campaigns = os.path.join(base, "campañas")
    pdf_dir = os.path.join(base, "assets", "pdf")

    files = [
        ("fase1-guia-montaje-completa.md", "Fase-1-Reconocimiento-Google-Ads-Effix-2026.pdf", "1"),
        ("fase2-guia-montaje-completa.md", "Fase-2-Consideracion-Google-Ads-Effix-2026.pdf", "2"),
        ("fase3-guia-montaje-completa.md", "Fase-3-Urgencia-Venta-Google-Ads-Effix-2026.pdf", "3"),
    ]

    for md_name, pdf_name, fase in files:
        md_path = os.path.join(campaigns, md_name)
        pdf_path = os.path.join(pdf_dir, pdf_name)
        if os.path.exists(md_path):
            generate_pdf(md_path, pdf_path, fase)
        else:
            print(f"WARNING: {md_path} not found, skipping.")

    print("\nDone! All PDFs generated.")
