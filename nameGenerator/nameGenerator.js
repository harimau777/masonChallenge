import { adjectives, materials, buildings, locations } from './nameParts';

// Masks used to select the bits in the componentId that will generate a given part of the name:
const adjectiveMask = 0x0000003F;
const materialMask = 0x00000FC0;
const buildingMask = 0x0003F000;
const locationMask = 0x00FC0000;
const numberMask = 0xFF000000;

export function nameGenerator(componentId) {
  // Get the parts of the name by applying masks to the componentId:
  const adjective = adjectives[applyMask(componentId, adjectiveMask, 0) - 1];
  const material = materials[applyMask(componentId, materialMask, 6) - 1];
  const building = buildings[applyMask(componentId, buildingMask, 12) - 1];
  const location = locations[applyMask(componentId, locationMask, 18) - 1];
  const number = applyMask(componentId, numberMask, 24);

  // Return the name:
  return `The ${adjective} ${material} ${building} of ${location} ${number}`;
}

// Apply a mask and shift the resulting bits to the start of the number:
function applyMask(componentId, mask, maskOffset) {
  return (componentId & mask) >> maskOffset;
}

const randomId = Math.floor(Math.random() * 2147483647);
console.log(`Component id: ${randomId} Human readable name: ${nameGenerator(randomId)}`);
