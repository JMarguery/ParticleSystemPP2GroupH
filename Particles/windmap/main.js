import jsonData from '/windmapData/vents025.json' with { type: 'json' };

export const data = jsonData;

Simulation.create(data);

