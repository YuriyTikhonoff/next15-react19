const cardLevelsMap: Map<number, { text: string; daysToRest: number }> =
  new Map([
    [1, { text: "New", daysToRest: 3 }],
    [2, { text: "Familiar", daysToRest: 5 }],
    [3, { text: "Practiced", daysToRest: 7 }],
    [4, { text: "Memorized", daysToRest: 14 }],
  ]);

export default cardLevelsMap;
