import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Paper, Grid } from "@mui/material";
import jsPDF from "jspdf";

interface DogBreedInfo {
  name: string;
  origin: string;
  min_life_expectancy: number;
  max_life_expectancy: number;
  min_weight: number;
  max_weight: number;
  min_height: number;
  max_height: number;
  shedding: number;
  barking: number;
  energy: number;
  protectiveness: number;
  trainability: number;
  imageUrl?: string;
}

const DogProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [breedInfo, setBreedInfo] = useState<DogBreedInfo | null>(null);

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
    pdf.text(`Origin: ${breedInfo.origin}`, 30, currentY);
    currentY += 8;
    pdf.text(`Life Expectancy: ${breedInfo.min_life_expectancy} - ${breedInfo.max_life_expectancy} years`, 30, currentY);
    currentY += 8;
    pdf.text(`Weight: ${breedInfo.min_weight} - ${breedInfo.max_weight} lbs`, 30, currentY);
    currentY += 8;
    pdf.text(`Height: ${breedInfo.min_height} - ${breedInfo.max_height} inches`, 30, currentY);
    currentY += 15;
    pdf.save(`${breedInfo.name.toLowerCase()}-profile.pdf`);
  };

  const handleShare = async () => {
    if (!breedInfo) return;
    const shareUrl = `${window.location.origin}/dog-profile/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${breedInfo.name} Dog Profile`,
          text: `Check out this ${breedInfo.name} dog from TellTail!`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert("Profile link copied to clipboard!"))
        .catch(() => alert("Failed to copy link"));
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
              <div><span className="font-medium">Origin: </span>{breedInfo.origin}</div>
              <div><span className="font-medium">Life Expectancy: </span>{breedInfo.min_life_expectancy} - {breedInfo.max_life_expectancy} years</div>
              <div><span className="font-medium">Weight: </span>{breedInfo.min_weight} - {breedInfo.max_weight} lbs</div>
              <div><span className="font-medium">Height: </span>{breedInfo.min_height} - {breedInfo.max_height} inches</div>
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
                { label: "Trainability", value: breedInfo.trainability }
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
          <button onClick={handleShare} className="w-full py-2 px-4 rounded-md bg-[#CCBEB1] text-black hover:bg-[#FFD3AC] transition-colors">Share Profile</button>
        </div>
      </Paper>
    </div>
  );
};

export default DogProfile;