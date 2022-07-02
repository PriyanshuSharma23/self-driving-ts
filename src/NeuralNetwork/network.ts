export class NeuralNetwork {
  levels: Level[];

  constructor(neuronCounts: number[]) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      const l = new Level(neuronCounts[i], neuronCounts[i + 1]);

      this.levels.push(l);
    }
  }

  static feedForward(inputs: number[], network: NeuralNetwork): number[] {
    let outputs = Level.feedForward(inputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }

    return outputs;
  }
}

export class Level {
  inputs: number[];
  outputs: number[];
  biases: number[];
  weights: number[][] = [];

  constructor(noOfInputs: number, noOfOutputs: number) {
    this.inputs = Array(noOfInputs);
    this.outputs = Array(noOfOutputs);
    this.biases = Array(noOfOutputs);

    for (let i = 0; i < noOfInputs; i++) {
      this.weights.push(Array(noOfOutputs));
    }

    Level.randomize(this);
  }

  static randomize(l: Level) {
    for (let i = 0; i < l.inputs.length; i++) {
      for (let j = 0; j < l.weights[0].length; j++) {
        l.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < l.biases.length; i++) {
      l.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs: number[], level: Level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
    }

    return level.outputs;
  }
}
