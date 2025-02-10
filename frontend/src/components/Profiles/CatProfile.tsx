import React from 'react';

/* ++++++++++ ROUTING ++++++++++ */
import { useLocation, useNavigate } from 'react-router-dom';

/* ++++++++++ UI/UX ++++++++++ */
import { Paper, Grid } from '@mui/material';

/* ++++++++++ PDF Download ++++++++++ */
import jsPDF from 'jspdf';


interface CatBreedInfo {
  name: string;
  length: string;
  origin: string;
  intelligence: number;
  family_friendly: number;
  shedding: number;
  general_health: number;
  grooming: number;
  children_friendly: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  min_weight: number;
  max_weight: number;
  imageUrl?: string;
}

const CatProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const breedInfo = location.state?.breedInfo as CatBreedInfo;

  const handleUploadAnother = () => {
    navigate('/upload');
  };

  const generatePDF = () => {
    if (!breedInfo) return;
  
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(20);
    pdf.text(`${breedInfo.name} Profile`, 20, 20);
    
    let currentY = 30; // Start position after title
  
    // Add image at the top if available
    if (breedInfo.imageUrl) {
      pdf.addImage(breedInfo.imageUrl, 'JPEG', 20, currentY, 120, 80);
      currentY += 90; // Move down past the image
    }
    
    // Add basic information
    pdf.setFontSize(12);
    pdf.text('Basic Information:', 20, currentY);
    currentY += 10;
    pdf.text(`Origin: ${breedInfo.origin}`, 30, currentY);
    currentY += 8;
    pdf.text(`Life Expectancy: ${breedInfo.min_life_expectancy} - ${breedInfo.max_life_expectancy} years`, 30, currentY);
    currentY += 8;
    pdf.text(`Weight Range: ${breedInfo.min_weight} - ${breedInfo.max_weight} kg`, 30, currentY);
    currentY += 8;
    pdf.text(`Coat Length: ${breedInfo.length}`, 30, currentY);
    currentY += 15;
  
    // Add characteristics with bar charts
    pdf.text('Characteristics (out of 5):', 20, currentY);
    currentY += 10;
    
    const traits = [
      { label: "Intelligence", value: breedInfo.intelligence },
      { label: "Family Friendly", value: breedInfo.family_friendly },
      { label: "Children Friendly", value: breedInfo.children_friendly },
      { label: "Grooming Needs", value: breedInfo.grooming },
      { label: "Shedding Level", value: breedInfo.shedding },
      { label: "General Health", value: breedInfo.general_health }
    ];
  
    const barWidth = 100; // Width of the full bar
    const barHeight = 5; // Height of the bar
    const spacing = 15; // Reduced spacing between bars
  
    traits.forEach(trait => {
      // Draw label and value
      pdf.text(`${trait.label}: ${trait.value}/5`, 30, currentY);
      
      // Draw background bar (gray)
      pdf.setFillColor(229, 231, 235); // Light gray
      pdf.rect(30, currentY + 2, barWidth, barHeight, 'F');
      
      // Draw filled bar (primary color)
      pdf.setFillColor(51, 28, 8); // Your primary color (#331C08)
      pdf.rect(30, currentY + 2, (trait.value / 5) * barWidth, barHeight, 'F');
      
      currentY += spacing;
    });
  
    // Save the PDF
    pdf.save(`${breedInfo.name.toLowerCase()}-profile.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${breedInfo.name} Cat Profile`,
          text: `Check out this ${breedInfo.name} cat from TellTail!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported on this browser');
    }
  };

  if (!breedInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-primary mb-6">No breed information available</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      <Paper className="p-6 shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{breedInfo.name} </h1>
          {breedInfo.imageUrl && (
            <img
              src={breedInfo.imageUrl}
              alt={breedInfo.name}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
          )}
        </div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Origin: </span>
                <span>{breedInfo.origin}</span>
              </div>
              <div>
                <span className="font-medium">Life Expectancy: </span>
                <span>{breedInfo.min_life_expectancy} - {breedInfo.max_life_expectancy} years</span>
              </div>
              <div>
                <span className="font-medium">Weight Range: </span>
                <span>{breedInfo.min_weight} - {breedInfo.max_weight} kg</span>
              </div>
              <div>
                <span className="font-medium">Coat Length: </span>
                <span>{breedInfo.length}</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Characteristics</h2>
            <div className="space-y-4">
              {[
                { label: "Intelligence", value: breedInfo.intelligence },
                { label: "Family Friendly", value: breedInfo.family_friendly },
                { label: "Children Friendly", value: breedInfo.children_friendly },
                { label: "Grooming Needs", value: breedInfo.grooming },
                { label: "Shedding Level", value: breedInfo.shedding },
                { label: "General Health", value: breedInfo.general_health }
              ].map(trait => (
                <div key={trait.label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{trait.label}</span>
                    <span>{trait.value}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary rounded-full h-2.5 transition-all duration-300"
                      style={{ width: `${(trait.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
        <div className="mt-8 text-center flex flex-col items-center justify-evenly h-[15vh]">

          <button
            onClick={handleUploadAnother}
            className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Upload Another Pet
          </button>

          <button
            onClick={generatePDF}
            className="bg-tertiary hover:bg-tertiary-light text-primary font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Download Profile as PDF
          </button>

          <button
            onClick={handleShare}
            className="bg-tertiary hover:bg-tertiary-light text-primary font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Share Profile
          </button>

        </div>
      </Paper>
    </div>
  );
};

export default CatProfile;
