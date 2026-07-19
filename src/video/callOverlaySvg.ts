export type CallOverlayOptions = {
  greenSlot: boolean;
  greenSlotScale: number;
  controlsScale: number;
};

export const getGreenSlotRect = (greenSlotScale: number) => ({
  x: 720 - 320 * greenSlotScale,
  y: 0,
  width: 320 * greenSlotScale,
  height: 510 * greenSlotScale,
});

export const controlsTransformOrigin = {x: 360, y: 1190};
