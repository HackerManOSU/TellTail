import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Paper, Grid } from "@mui/material";
import jsPDF from "jspdf";

interface DogBreedInfo {
  name: string;
  min_life_expectancy: number;
  max_life_expectancy: number;
  min_weight_male: number;
  max_weight_male: number;
  min_height_male: number;
  max_height_male: number;
  min_weight_female: number;
  max_weight_female: number;
  min_height_female: number;
  max_height_female: number;
  shedding: number;
  barking: number;
  energy: number;
  protectiveness: number;
  trainability: number;
  grooming: number;
  drooling: number;
  coat_length: number;
  good_with_children: number;
  good_with_other_dogs: number;
  good_with_strangers: number;
  playfulness: number;
  imageUrl?: string;
  origin?: string;
  health_issues?: string;
}

const DogProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [breedInfo, setBreedInfo] = useState<DogBreedInfo | null>(null);
  const [additionalData, setAdditionalData] = useState<{ origin?: string; health_issues?: string }>({});

  useEffect(() => {
    if (location.state?.breedInfo) {
      const profile = location.state.breedInfo as DogBreedInfo;
      sessionStorage.setItem(`dog-profile-${id}`, JSON.stringify(profile));
      setBreedInfo(profile);
    } else if (id) {
      const stored = sessionStorage.getItem(`dog-profile-${id}`);
      if (stored) {
        setBreedInfo(JSON.parse(stored));
      }
    }
  }, [id, location]);

  useEffect(() => {
    if (!breedInfo) return;

    fetch("/dog_breeds_origin_health.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        const match = data.find((item: DogBreedInfo) => item.name.toLowerCase().trim() === breedInfo.name.toLowerCase().trim());
        console.log("Matched Breed:", match);
        if (match) {
          setAdditionalData({
            origin: match.origin,
            health_issues: match.health_issues,
          });
        }
      })
      .catch((error) => console.error("Error fetching breed details:", error));
  }, [breedInfo]);


  const handleDownloadPDF = () => {
    if (!breedInfo) return;
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text(`${breedInfo.name} Profile`, 20, 20);
    let currentY = 30;

    if (breedInfo.imageUrl) {
      pdf.addImage(breedInfo.imageUrl, "JPEG", 20, currentY, 120, 80);
      currentY += 90;
    }

    pdf.setFontSize(12);
    pdf.text("Basic Information:", 20, currentY);
    currentY += 10;
    pdf.text(`Origin: ${additionalData.origin || "Unknown"}`, 30, currentY);
    currentY += 8;
    pdf.text(`Life Expectancy: ${breedInfo.min_life_expectancy} - ${breedInfo.max_life_expectancy} years`, 30, currentY);
    currentY += 8;
    pdf.text(`Male Weight: ${breedInfo.min_weight_male} - ${breedInfo.max_weight_male} lbs`, 30, currentY);
    currentY += 8;
    pdf.text(`Male Height: ${breedInfo.min_height_male} - ${breedInfo.max_height_male} inches`, 30, currentY);
    currentY += 8;
    pdf.text(`Female Weight: ${breedInfo.min_weight_female} - ${breedInfo.max_weight_female} lbs`, 30, currentY);
    currentY += 8;
    pdf.text(`Female Height: ${breedInfo.min_height_female} - ${breedInfo.max_height_female} inches`, 30, currentY);
    currentY += 12;
    pdf.text("Common Health Issues:", 20, currentY);
    currentY += 10;
    pdf.text(`${additionalData.health_issues || "No known issues"}`, 30, currentY);
    currentY += 12;

    pdf.text("Characteristics:", 20, currentY);
    currentY += 10;

    const characteristics = [
      { label: "Shedding", value: breedInfo.shedding },
      { label: "Barking", value: breedInfo.barking },
      { label: "Energy", value: breedInfo.energy },
      { label: "Protectiveness", value: breedInfo.protectiveness },
      { label: "Trainability", value: breedInfo.trainability },
      { label: "Drooling", value: breedInfo.drooling },
      { label: "Coat Length", value: breedInfo.coat_length },
      { label: "Good With Children", value: breedInfo.good_with_children },
      { label: "Good With Other Dogs", value: breedInfo.good_with_other_dogs },
      { label: "Good With Strangers", value: breedInfo.good_with_strangers },
      { label: "Playfulness", value: breedInfo.playfulness },
    ];

    characteristics.forEach(({ label, value }) => {
      pdf.text(`${label}: ${value}/5`, 30, currentY);
      currentY += 8;
    });

    pdf.save(`${breedInfo.name.toLowerCase()}-profile.pdf`);
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
          <h1 className="text-3xl font-bold text-primary mb-2">{breedInfo.name}</h1>
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
              <div><span className="font-medium">Origin: </span>{additionalData.origin || "Unknown"}</div>
              <div><span className="font-medium">Common Health Issues: </span>{additionalData.health_issues || "No known issues"}</div>
              <div><span className="font-medium">Life Expectancy: </span>{breedInfo.min_life_expectancy} - {breedInfo.max_life_expectancy} years</div>
              <div><span className="font-medium">Male Weight: </span>{breedInfo.min_weight_male} - {breedInfo.max_weight_male} lbs</div>
              <div><span className="font-medium">Male Height: </span>{breedInfo.min_height_male} - {breedInfo.max_height_male} inches</div>
              <div><span className="font-medium">Female Weight: </span>{breedInfo.min_weight_female} - {breedInfo.max_weight_female} lbs</div>
              <div><span className="font-medium">Female Height: </span>{breedInfo.min_height_female} - {breedInfo.max_height_female} inches</div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Characteristics</h2>
            <div className="space-y-4">
              {[
                { label: "Shedding", value: breedInfo.shedding },
                { label: "Barking", value: breedInfo.barking },
                { label: "Energy", value: breedInfo.energy },
                { label: "Protectiveness", value: breedInfo.protectiveness },
                { label: "Trainability", value: breedInfo.trainability },
                { label: "Drooling", value: breedInfo.drooling },
                { label: "Coat Length", value: breedInfo.coat_length },
                { label: "Good With Children", value: breedInfo.good_with_children },
                { label: "Good With Other Dogs", value: breedInfo.good_with_other_dogs },
                { label: "Good With Strangers", value: breedInfo.good_with_strangers },
                { label: "Playfulness", value: breedInfo.playfulness },
              ].map(trait => (
                <div key={trait.label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{trait.label}</span>
                    <span>{trait.value}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary rounded-full h-2.5 transition-all duration-300" style={{ width: `${(trait.value / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>

        <div className="mt-6 flex flex-col gap-4">
          <button onClick={() => navigate("/upload/dog")} className="w-full py-2 px-4 rounded-md bg-[#331C08] text-white hover:bg-[#664C36] transition-colors">Upload Another Pet</button>
          <button onClick={handleDownloadPDF} className="w-full py-2 px-4 rounded-md bg-[#CCBEB1] text-black hover:bg-[#FFD3AC] transition-colors">Download Profile as PDF</button>
        </div>
      </Paper>
    </div>
  );
};

export default DogProfile;
