// src/components/Profiles/CatProfile.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Grid } from '@mui/material';

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
        <div className="mt-8 text-center">
          <button
            onClick={handleUploadAnother}
            className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Upload Another Pet
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default CatProfile;
