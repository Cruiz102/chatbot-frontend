"""Load html from files, clean up, split, ingest into Weaviate."""
import logging
import os
from bs4 import BeautifulSoup
import weaviate
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders.recursive_url_loader import RecursiveUrlLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Weaviate
from langchain.document_transformers import Html2TextTransformer
from constants import (WEAVIATE_DOCS_INDEX_NAME,)
import argparse

WEAVIATE_URL = os.environ["WEAVIATE_URL"]
WEAVIATE_API_KEY = os.environ["WEAVIATE_API_KEY"]



import os

def list_pdf_files(directory):
    return [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.pdf')]



def create_class(class_name: str, client ):
    class_obj = {
        "class": class_name,
        "vectorizer": "text2vec-openai", 
        "moduleConfig": {
            "text2vec-openai": {},
            "generative-openai": {} 
            },
        "properties": [
            {
                "dataType": ["string"],
                "description": "Name of the document",
                "name": "document"
            },
            {
                "dataType": ["string"],
                "description": "Content of the Chunk",
                "name": "text"
            },
            {
                "dataType": ["int"],
                "description": "Page of the document where is the chunk",
                "name": "page"
            },

        ]
    }
    client.schema.create_class(class_obj)

def add_object(client, objects_list, class_name):
    client.batch.configure(batch_size=100, num_workers = 2)
    with client.batch as batch:
        for i, d in enumerate(objects_list):
            print(f"importing question: {i+1}")
            object = {
             "document": d.metadata["source"],   
             "text": d.page_content,
             "page": d.metadata["page"]
        }
            batch.add_data_object(
                data_object=object,
                class_name= class_name
            )



def ingest_docs(args, client):
    documents = list_pdf_files(args.pdf_folder)
    # Check for errors when loading the pdfs
    if not isinstance(documents, str):
        assert(documents)
    for doc in documents:
        # print(doc)
        # pass
        # # print(type(doc))
        loader = PyPDFLoader(doc)
        pages = loader.load_and_split()
        add_object(client, pages, args.class_name)


    
    # vectorstore = Weaviate(
    #     client,
    #     WEAVIATE_DOCS_INDEX_NAME,
    #     "text",
    #     embedding=embedding,
    #     by_text=False,
    #     attributes=["source"],
    # )
    

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest PDFs into Weaviate database.")
    parser.add_argument("--pdf_folder", type=str, help="Path to the folder containing PDFs.")
    parser.add_argument("--class_name", type=str, help="Class where to save the object in the schema.")
    parser.add_argument("--new_class", type=str, help="Class where to save the object in the schema.")

    args = parser.parse_args()
    client = weaviate.Client(
    url=WEAVIATE_URL,
    auth_client_secret=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]
    }

    )
    print("hola")
    result = (
  client.query
  .get("Test", "text")
  .with_limit(10)
  .with_offset(3)
  .do()
)

    print(result)


    if args.new_class:
        create_class(args.class_name, client)
    ingest_docs(args, client)