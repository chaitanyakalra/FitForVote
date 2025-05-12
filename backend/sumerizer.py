import json
from transformers import pipeline

# Load the summarization pipeline with the BART model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Sample JSON with raw data
ARTICLE_JSON = '''
    
'''

# Parse the JSON to extract raw data
article_data = json.loads(ARTICLE_JSON)
ARTICLE = article_data["raw_text"]

# Generate summary
summary = summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False)

# Print summary text
print(summary[0]['summary_text'])
