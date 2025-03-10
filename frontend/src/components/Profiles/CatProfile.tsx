import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Paper, Grid } from '@mui/material';
import jsPDF from 'jspdf';

interface CatBreedInfo {
  name: string;
  length: string;
  origin: string;
  intelligence: number;
  family_friendly: number;
  playfulness: number;
  shedding: number;
  general_health: number;
  grooming: number;
  children_friendly: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  min_weight: number;
  max_weight: number;
  imageUrl?: string;
  health_issues?: string;  // Optional field for fetched data
}

const CatProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [breedInfo, setBreedInfo] = useState<CatBreedInfo | null>(null);

  // 1) Load breed info from location state or session storage
  useEffect(() => {
    if (location.state?.breedInfo) {
      const profile = location.state.breedInfo as CatBreedInfo;
      sessionStorage.setItem(`cat-profile-${id}`, JSON.stringify(profile));
      setBreedInfo(profile);
    } else if (id) {
      const stored = sessionStorage.getItem(`cat-profile-${id}`);
      if (stored) {
        setBreedInfo(JSON.parse(stored));
      }
    }
  }, [id, location]);

  // 2) Fetch additional data (e.g. health_issues) from a local JSON
  useEffect(() => {
    if (!breedInfo) return;

    fetch("/cat_breeds_origin_health.json")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find(
          (item: CatBreedInfo) =>
            item.name.toLowerCase().trim() === breedInfo.name.toLowerCase().trim()
        );
        if (match && match.health_issues) {
          setBreedInfo((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              health_issues: match.health_issues,
            };
          });
        }
      })
      .catch((error) => console.error("Error fetching cat breed details:", error));
  }, [breedInfo]);

  const handleUploadAnother = () => {
    navigate('/upload');
  };

  const generatePDF = () => {
    if (!breedInfo) return;
    const pdf = new jsPDF();

    // Title
    pdf.setFontSize(20);
    pdf.text(`${breedInfo.name} Profile`, 20, 20);
    let currentY = 30;

    // Image if present
    if (breedInfo.imageUrl) {
      pdf.addImage(breedInfo.imageUrl, 'JPEG', 20, currentY, 120, 80);
      currentY += 90;
    }

    // Basic info
    pdf.setFontSize(12);
    pdf.text('Basic Information:', 20, currentY);
    currentY += 10;
    pdf.text(`Origin: ${breedInfo.origin}`, 30, currentY);
    currentY += 8;
    pdf.text(
      `Life Expectancy: ${breedInfo.min_life_expectancy} - ${breedInfo.max_life_expectancy} years`,
      30,
      currentY
    );
    currentY += 8;
    pdf.text(
      `Weight Range: ${breedInfo.min_weight} - ${breedInfo.max_weight} kg`,
      30,
      currentY
    );
    currentY += 8;
    pdf.text(`Coat Length: ${breedInfo.length}`, 30, currentY);
    currentY += 8;
    // New health issues line if available
    pdf.text(
      `Common Health Issues: ${breedInfo.health_issues || "No known issues"}`,
      30,
      currentY
    );
    currentY += 15;

    // Characteristics
    pdf.text('Characteristics (out of 5):', 20, currentY);
    currentY += 10;

    const traits = [
      { label: "Intelligence", value: breedInfo.intelligence },
      { label: "Family Friendly", value: breedInfo.family_friendly },
      { label: "Playfulness", value: breedInfo.playfulness },
      { label: "Children Friendly", value: breedInfo.children_friendly },
      { label: "Grooming Needs", value: breedInfo.grooming },
      { label: "Shedding Level", value: breedInfo.shedding },
      { label: "General Health", value: breedInfo.general_health }
    ];

    const barWidth = 100;
    const barHeight = 5;
    const spacing = 15;

    traits.forEach(trait => {
      pdf.text(`${trait.label}: ${trait.value}/5`, 30, currentY);
      // Gray background bar
      pdf.setFillColor(229, 231, 235);
      pdf.rect(30, currentY + 2, barWidth, barHeight, 'F');
      // Filled bar for rating
      pdf.setFillColor(51, 28, 8);
      pdf.rect(30, currentY + 2, (trait.value / 5) * barWidth, barHeight, 'F');

      currentY += spacing;
    });

    // Save the PDF
    pdf.save(`${breedInfo.name.toLowerCase()}-profile.pdf`);
  };

  if (!breedInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          No breed information available
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      <Paper className="p-6 shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {breedInfo.name}
          </h1>
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
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Basic Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Origin: </span>
                <span>{breedInfo.origin}</span>
              </div>
              <div>
                <span className="font-medium">Life Expectancy: </span>
                <span>
                  {breedInfo.min_life_expectancy} - {breedInfo.max_life_expectancy} years
                </span>
              </div>
              <div>
                <span className="font-medium">Weight Range: </span>
                <span>
                  {breedInfo.min_weight} - {breedInfo.max_weight} kg
                </span>
              </div>
              <div>
                <span className="font-medium">Coat Length: </span>
                <span>{breedInfo.length}</span>
              </div>

              {/* Display fetched health issues if present */}
              <div>
                <span className="font-medium">Common Health Issues: </span>
                <span>
                  {breedInfo.health_issues
                    ? breedInfo.health_issues
                    : "No known issues"}
                </span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Characteristics
            </h2>
            <div className="space-y-4">
              {[
                { label: "Intelligence", value: breedInfo.intelligence },
                { label: "Family Friendly", value: breedInfo.family_friendly },
                { label: "Playfulness", value: breedInfo.playfulness },
                { label: "Children Friendly", value: breedInfo.children_friendly },
                { label: "Grooming Needs", value: breedInfo.grooming },
                { label: "Shedding Level", value: breedInfo.shedding },
                { label: "General Health", value: breedInfo.general_health }
              ].map((trait) => (
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
            className="bg-secondary hover:bg-tertiary-light text-primary font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Download Profile as PDF
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default CatProfile;

