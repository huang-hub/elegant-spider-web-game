
class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private enabled = true;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Create audio elements for different game sounds
    const soundFiles = {
      cardFlip: this.createBeep(400, 0.1, 'sine'),
      cardMove: this.createBeep(300, 0.1, 'triangle'),
      cardDeal: this.createBeep(250, 0.15, 'sawtooth'),
      success: this.createBeep(600, 0.3, 'sine'),
      victory: this.createMelody([523, 659, 784, 1047], 0.2)
    };

    Object.entries(soundFiles).forEach(([name, audio]) => {
      this.sounds[name] = audio;
    });
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType): HTMLAudioElement {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    const audio = new Audio();
    
    // Create a data URL for the sound
    const canvas = document.createElement('canvas');
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    
    // Simplified approach - return a dummy audio element
    return audio;
  }

  private createMelody(frequencies: number[], noteDuration: number): HTMLAudioElement {
    return this.createBeep(frequencies[0], noteDuration * frequencies.length, 'sine');
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore audio play errors (common in browsers with autoplay restrictions)
      });
    }
  }

  playCardFlip() {
    this.play('cardFlip');
  }

  playCardMove() {
    this.play('cardMove');
  }

  playCardDeal() {
    this.play('cardDeal');
  }

  playSuccess() {
    this.play('success');
  }

  playVictory() {
    this.play('victory');
  }
}

export const soundManager = new SoundManager();
