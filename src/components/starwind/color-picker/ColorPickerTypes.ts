/**
 * // /src/components/starwind/color-picker/ColorPickerTypes.ts
 * Event type for color picker change events
 * Emitted when the color value changes
 */
export interface ColorPickerChangeEvent extends CustomEvent {
  detail: {
    value: string;
    selectId: string;
  };
}
