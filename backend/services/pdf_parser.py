from pypdf import PdfReader
import io

def extract_text(file_bytes):

    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        if not text.strip():
            raise Exception("No extractable text found")

        return text

    except Exception as e:
        raise Exception("Failed to process PDF")