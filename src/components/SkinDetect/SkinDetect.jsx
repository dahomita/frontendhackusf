import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

// Modern color palette
const colors = {
  primary: "#4C6FFF", // Blue primary
  secondary: "#15CD72", // Green for positive results
  warning: "#FFB54C", // Orange/Yellow for moderate warning
  danger: "#FF5C5C", // Red for high risk
  light: "#F5F7FF", // Light background
  dark: "#2D3748", // Dark text
  gray: "#94A3B8", // Gray for secondary text
  background: "white", // White for cards
  border: "#E2E8F0", // Border color
};

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 20px;
  background-color: ${colors.light};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px;
    margin: 20px auto;
  }
`;

const Title = styled.h1`
  color: ${colors.dark};
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 28px;
  grid-column: 1 / -1;
`;

const Description = styled.p`
  color: ${colors.gray};
  margin-bottom: 30px;
  line-height: 1.6;
  grid-column: 1 / -1;
`;

const Card = styled.div`
  background: ${colors.background};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: ${colors.dark};
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 18px;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${props => props.isDragActive ? colors.primary : colors.border};
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.isDragActive ? `${colors.primary}10` : colors.light};
  transition: all 0.2s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${colors.primary};
    background-color: ${`${colors.primary}10`};
  }
`;

const UploadIcon = styled.div`
  font-size: 40px;
  color: ${colors.primary};
  margin-bottom: 16px;
`;

const DropzoneText = styled.p`
  color: ${colors.gray};
  margin-bottom: 8px;
`;

const BrowseButton = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  cursor: pointer;
`;

const Preview = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.danger};
  font-size: 18px;
  
  &:hover {
    background: white;
  }
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: ${`${colors.primary}dd`};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 111, 255, 0.2);
  }
  
  &:disabled {
    background-color: ${colors.gray};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultCard = styled(Card)`
  background-color: white;
`;

const ResultHeading = styled.h3`
  color: ${colors.dark};
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 18px;
`;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 10px;
  background-color: ${colors.light};
  
  h4 {
    color: ${colors.dark};
    font-weight: 600;
    margin: 0;
  }
  
  p {
    margin: 8px 0 0 0;
    color: ${colors.gray};
    font-size: 14px;
  }
`;

const ResultBadge = styled.div`
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  color: white;
  background-color: ${props => {
    const probability = props.probability * 100;
    if (probability > 70) return colors.danger;
    if (probability > 30) return colors.warning;
    return colors.secondary;
  }};
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyResult = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  text-align: center;
  padding: 40px 0;
  
  svg {
    margin-bottom: 16px;
    color: ${colors.gray};
    width: 60px;
    height: 60px;
    opacity: 0.5;
  }
  
  p {
    margin-bottom: 8px;
    font-size: 16px;
  }
  
  span {
    font-size: 14px;
  }
`;

const SkinDetect = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl("");
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Simulate API call until actual endpoint is ready
      setTimeout(() => {
        // This is sample data - replace with actual API call
        setResult({
          prediction: Math.random() > 0.5 ? "Benign" : "Malignant",
          probability: Math.random(),
          details: {
            category: Math.random() > 0.5 ? "Melanoma" : "Basal Cell Carcinoma",
            recommendation: "Please consult with a dermatologist for further evaluation."
          }
        });
        setLoading(false);
      }, 2000);

      // Uncomment this for the actual API call
      /*
      const res = await fetch("https://skin-cancer-api.azurewebsites.net/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      */
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult({ 
        prediction: "Error", 
        probability: 0,
        details: {
          category: "Error",
          recommendation: "An error occurred. Please try again later."
        }
      });
    }
  };

  return (
    <Container>
      <Title>Skin Concern Analysis</Title>
      <Description>
        Upload an image of your skin concern, and our AI will analyze it for potential issues. 
        This tool is designed to help identify potential skin issues, but it's not a substitute for professional medical advice.
      </Description>
      
      <Card>
        <CardTitle>Upload Image</CardTitle>
        
        {!previewUrl ? (
          <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
            <input {...getInputProps()} />
            <UploadIcon>📷</UploadIcon>
            
            {isDragActive ? (
              <DropzoneText>Drop the image here</DropzoneText>
            ) : (
              <>
                <DropzoneText>Drag and drop an image here, or</DropzoneText>
                <BrowseButton>browse files</BrowseButton>
              </>
            )}
            
            <DropzoneText style={{ marginTop: 20, fontSize: 13 }}>
              Supported formats: JPG, PNG, WEBP
            </DropzoneText>
          </DropzoneContainer>
        ) : (
          <Preview>
            <img src={previewUrl} alt="Preview" />
            <RemoveButton onClick={handleRemoveImage}>×</RemoveButton>
          </Preview>
        )}
        
        <Button 
          onClick={handleSubmit} 
          disabled={!imageFile || loading}
        >
          {loading ? <LoadingSpinner /> : <span>Analyze Image</span>}
        </Button>
      </Card>
      
      <ResultCard>
        <ResultHeading>Analysis Results</ResultHeading>
        
        {loading ? (
          <EmptyResult>
            <LoadingSpinner style={{ width: 40, height: 40, borderWidth: 4 }} />
            <p>Analyzing your image</p>
            <span>This may take a few moments</span>
          </EmptyResult>
        ) : result ? (
          <ResultInfo>
            <ResultItem>
              <div>
                <h4>Prediction</h4>
                <p>AI assessment result</p>
              </div>
              <ResultBadge probability={result.prediction === "Malignant" ? 0.8 : 0.2}>
                {result.prediction}
              </ResultBadge>
            </ResultItem>
            
            <ResultItem>
              <div>
                <h4>Confidence</h4>
                <p>How certain the AI is about this prediction</p>
              </div>
              <ResultBadge probability={result.probability}>
                {(result.probability * 100).toFixed(0)}%
              </ResultBadge>
            </ResultItem>
            
            {result.details && (
              <>
                <ResultItem>
                  <div>
                    <h4>Category</h4>
                    <p>Specific type identified</p>
                  </div>
                  <div style={{ fontWeight: 600, color: colors.dark }}>
                    {result.details.category}
                  </div>
                </ResultItem>
                
                <ResultItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <h4>Recommendation</h4>
                  <p style={{ marginTop: 10, color: colors.dark }}>
                    {result.details.recommendation}
                  </p>
                </ResultItem>
              </>
            )}
          </ResultInfo>
        ) : (
          <EmptyResult>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No results yet</p>
            <span>Upload an image and click analyze to get started</span>
          </EmptyResult>
        )}
      </ResultCard>
    </Container>
  );
};

export default SkinDetect;
