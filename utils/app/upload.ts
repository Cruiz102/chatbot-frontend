// utils/api.ts
import { UploadPDFRequest, CreateClassRequest } from "@/types/UploadPDFRequest";

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

async function uploadPDF(requestData: UploadPDFRequest): Promise<Response> {
  const formData = new FormData();
  formData.append('url', requestData.url);
  formData.append('weaviate_api_key', requestData.weaviateApiKey);
  formData.append('openai_api_key', requestData.openaiApiKey);
  formData.append('class_name', requestData.className);
  formData.append('file', requestData.file);

  const response = await fetch(`${API_URL}/upload_pdf/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function createClass(requestData: CreateClassRequest): Promise<Response> {
  const formData = new FormData();
  formData.append('url', requestData.url);
  formData.append('weaviate_api_key', requestData.weaviateApiKey);
  formData.append('openai_api_key', requestData.openaiApiKey);
  formData.append('class_name', requestData.className);

  const response = await fetch(`${API_URL}/create_class/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export { uploadPDF, createClass };
