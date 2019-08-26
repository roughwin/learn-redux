import React from 'react';

export default class AudioDemo extends React.Component {
  constructor() {
    super();
    this.ctx = new AudioContext();
    this.sourceNode = this.ctx.createBufferSource();
    const analyserNode = this.ctx.createAnalyser();
    const javascriptNode = this.ctx.createScriptProcessor(1024, 1, 1);
    const amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
    this.sourceNode.connect(this.ctx.destination);
    this.sourceNode.connect(analyserNode);
    analyserNode.connect(this.ctx.destination);
    javascriptNode.connect(this.ctx.destination);

    javascriptNode.onaudioprocess = function () {
      // get the Time Domain data for this sample
      analyserNode.getByteTimeDomainData(amplitudeArray);
      console.log(amplitudeArray);
  }
    // this.ctx = ctx;
  }

  loadSound = async () => {
    const resp = await fetch('music.mp3');
    const buf = await resp.arrayBuffer();
    this.ctx.decodeAudioData(buf, (buffer) => {
      console.log(buffer)
      this.sourceNode.buffer = buffer;
      this.sourceNode.start(0);
      this.sourceNode.loop = true;
    }, (err) => {
      console.log('error', err);
    })
  }

  render() {
    return <div>
      <button onClick={this.loadSound}>fetch</button>
      <audio controls ref={el => { window.a = el; }}>
        <source src="audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  }
}