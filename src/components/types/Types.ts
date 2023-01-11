// Declaring an interface for the state object.
export interface TypeMessageIsSent {
  sent: boolean;
  setSent: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Occupation {
  name: string;
  abbreviation: string;
  setOccupations: React.Dispatch<React.SetStateAction<string[]>>;
}
