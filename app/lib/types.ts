export interface Character {
  name: string;
  image: string;
  guide: string;
}

export interface Skill {
  Skill: string;
  Rating: "Best" | "Good" | "Situational" | "Excess";
  Style: string;
  Distance: string;
}

export interface TargetStats {
  Speed: number | string;
  Stamina: number | string;
  Power: number | string;
  Guts: number | string;
  Wit: number | string;
  Misc: string;
}

export interface Build {
  Cards: string[];
  Inherit: string;
  "Target Stats": TargetStats;
  Note: string;
}

export interface DistanceGroup {
  Distance: string;
  build: Build[];
}

export interface Scenario {
  Scenario: string;
  builds: DistanceGroup[];
}

export interface Race {
  name: string;
  time: string;
  optional?: boolean;
  note?: string;
}

export interface YearGroup {
  year: string;
  races: Race[];
}

export interface Link {
  text: string;
  url: string;
}
