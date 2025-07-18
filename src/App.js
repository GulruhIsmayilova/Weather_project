import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, Switch, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from 'framer-motion';
import './App.css';

// Dummy weather data
const dummyWeather = {
  city: 'Cappadocia',
  country: 'Turkey',
  current: {
    tempC: 18,
    tempF: 64,
    condition: 'Clear',
    feelsLikeC: 17,
    feelsLikeF: 63,
    date: '2025-07-17',
    time: '06:30',
    sunrise: '05:45',
    sunset: '20:15',
    wind: 12,
    humidity: 60,
    pressure: 1012,
    precipitation: 10,
  },
  hourly: [
    { time: '03:00', tempC: 14, tempF: 57, icon: <NightsStayIcon />, label: 'Night', condition: 'Clear' },
    { time: '06:00', tempC: 16, tempF: 61, icon: <WbSunnyIcon />, label: 'Morning', condition: 'Sunny' },
    { time: '12:00', tempC: 22, tempF: 72, icon: <WbSunnyIcon />, label: 'Day', condition: 'Sunny' },
    { time: '18:00', tempC: 20, tempF: 68, icon: <WbSunnyIcon />, label: 'Evening', condition: 'Clear' },
  ],
  daily: [
    { date: 'Thu', minC: 13, maxC: 22, minF: 55, maxF: 72, icon: <WbSunnyIcon />, condition: 'Sunny' },
    { date: 'Fri', minC: 14, maxC: 23, minF: 57, maxF: 73, icon: <WbSunnyIcon />, condition: 'Sunny' },
    { date: 'Sat', minC: 15, maxC: 24, minF: 59, maxF: 75, icon: <WbSunnyIcon />, condition: 'Sunny' },
    { date: 'Sun', minC: 16, maxC: 25, minF: 61, maxF: 77, icon: <WbSunnyIcon />, condition: 'Sunny' },
    { date: 'Mon', minC: 15, maxC: 23, minF: 59, maxF: 73, icon: <WbSunnyIcon />, condition: 'Sunny' },
    { date: 'Tue', minC: 14, maxC: 22, minF: 57, maxF: 72, icon: <WbSunnyIcon />, condition: 'Sunny' },
    { date: 'Wed', minC: 13, maxC: 21, minF: 55, maxF: 70, icon: <WbSunnyIcon />, condition: 'Sunny' },
  ],
  locations: [
    { city: 'Cappadocia', country: 'Turkey' },
    { city: 'Paris', country: 'France' },
    { city: 'Kyoto', country: 'Japan' },
    { city: 'Banff', country: 'Canada' },
  ],
};

function App() {
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(dummyWeather.city);

  const handleUnitToggle = () => setIsCelsius((prev) => !prev);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);

  // Find selected location data (dummy for now)
  const weather = dummyWeather;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar: Location & Unit Toggle */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
        <Grid item>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 140, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2, backdropFilter: 'blur(8px)' }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              label="Location"
            >
              {weather.locations.map((loc) => (
                <MenuItem key={loc.city} value={loc.city}>{loc.city}, {loc.country}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2, px: 2, py: 0.5, backdropFilter: 'blur(8px)' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>°C</Typography>
            <Switch checked={!isCelsius} onChange={handleUnitToggle} color="primary" />
            <Typography variant="body2">°F</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={4} sx={{ flex: 1, px: { xs: 1, md: 8 }, py: { xs: 2, md: 6 } }} alignItems="center" justifyContent="center">
        {/* Weather Info Card */}
        <Grid item xs={12} md={6} lg={5}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.25)', borderRadius: 5, boxShadow: 3, backdropFilter: 'blur(12px)', p: 4 }}>
              <CardContent>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {isCelsius ? `${weather.current.tempC}°C` : `${weather.current.tempF}°F`}
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {weather.current.condition}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Feels like: {isCelsius ? `${weather.current.feelsLikeC}°C` : `${weather.current.feelsLikeF}°F`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {weather.current.date} | {weather.current.time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <WbSunnyIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ mr: 2 }}>Sunrise: {weather.current.sunrise}</Typography>
                  <NightsStayIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">Sunset: {weather.current.sunset}</Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* More Details Panel */}
        <Grid item xs={12} md={6} lg={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.25)', borderRadius: 5, boxShadow: 3, backdropFilter: 'blur(12px)', p: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>More Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AirIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Wind: {weather.current.wind} km/h</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <OpacityIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Humidity: {weather.current.humidity}%</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DeviceThermostatIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Pressure: {weather.current.pressure} hPa</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WaterDropIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Precip: {weather.current.precipitation}%</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Forecast Slider */}
      <Box sx={{ width: '100%', px: { xs: 1, md: 8 }, mb: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.18)', borderRadius: 4, boxShadow: 2, backdropFilter: 'blur(10px)', p: 2, overflowX: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 320, justifyContent: 'center' }}>
              {weather.hourly.map((h, idx) => (
                <Box key={idx} sx={{ textAlign: 'center', minWidth: 80 }}>
                  <Typography variant="body2" color="text.secondary">{h.label}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1 }}>
                    {h.icon}
                  </Box>
                  <Typography variant="h6">{isCelsius ? `${h.tempC}°C` : `${h.tempF}°F`}</Typography>
                  <Typography variant="caption" color="text.secondary">{h.time}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </motion.div>
      </Box>

      {/* 7-Day Forecast */}
      <Box sx={{ width: '100%', px: { xs: 1, md: 8 }, pb: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <Grid container spacing={2} justifyContent="center">
            {weather.daily.map((d, idx) => (
              <Grid item xs={6} sm={4} md={1.7} key={idx}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.18)', borderRadius: 4, boxShadow: 2, backdropFilter: 'blur(10px)', p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">{d.date}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1 }}>
                    {d.icon}
                  </Box>
                  <Typography variant="body1">{isCelsius ? `${d.maxC}°C` : `${d.maxF}°F`}</Typography>
                  <Typography variant="body2" color="text.secondary">{isCelsius ? `${d.minC}°C` : `${d.minF}°F`}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
}

export default App;
