import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: #f0f4f8;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #344966;
  margin-bottom: 20px;
`;

const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Preview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #809bce;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #5b7bb4;
  }
`;

const ResultBox = styled.div`
  margin-top: 20px;
  padding: 12px;
  background-color: #e0f7e9;
  border-left: 5px solid #58b38e;
  border-radius: 6px;
  text-align: center;
`;

const SkinDetect = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setResult(null);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch("https://skin-cancer-api.azurewebsites.net/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult({ prediction: "Error", probability: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Skin Cancer Detection</Title>
      <UploadArea>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && <Preview src={previewUrl} alt="Preview" />}
        <Button onClick={handleSubmit} disabled={!imageFile || loading}>
          {loading ? "Analyzing..." : "Predict"}
        </Button>
      </UploadArea>

      {result && (
        <ResultBox>
          <h3>Prediction: {result.prediction}</h3>
          <p>Confidence: {(result.probability * 100).toFixed(2)}%</p>
        </ResultBox>
      )}
    </Container>
  );
};

export default SkinDetect;
