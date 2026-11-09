/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Elegant Web Audio API synthesizer for peaceful acoustic chime and warm chords
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingBgm = false;
  private bgmTimer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft ceremonial bell chime for opening envelope or lighting lantern
  public playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 2.0);
      });
    } catch {
      // Audio playback might be restricted before interaction
    }
  }

  // Gentle harp note
  public playSingleNote(freq: number, duration = 1.2) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Ignored
    }
  }

  // Start peaceful ambient progression (warm acoustic piano/music box harmony)
  public startAmbientBgm(onStateChange?: (playing: boolean) => void) {
    if (this.isPlayingBgm) return;
    this.initCtx();
    this.isPlayingBgm = true;
    onStateChange?.(true);

    // Warm pentatonic arpeggio sequence
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G
    ];

    let chordIdx = 0;

    const playStep = () => {
      if (!this.isPlayingBgm || !this.ctx) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((note, noteIdx) => {
        setTimeout(() => {
          if (this.isPlayingBgm) {
            this.playSingleNote(note * 1.5, 2.2);
          }
        }, noteIdx * 450);
      });

      this.bgmTimer = window.setTimeout(playStep, 3800);
    };

    playStep();
  }

  public stopAmbientBgm(onStateChange?: (playing: boolean) => void) {
    this.isPlayingBgm = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    onStateChange?.(false);
  }

  public toggleBgm(onStateChange?: (playing: boolean) => void): boolean {
    if (this.isPlayingBgm) {
      this.stopAmbientBgm(onStateChange);
      return false;
    } else {
      this.startAmbientBgm(onStateChange);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingBgm;
  }
}

export const soundEngine = new SoundEngine();
