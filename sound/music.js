
/// instrument1
var instrument1 = new Tone.Synth({
			"pitchDecay" : 0.008,
			"octaves" : 1,
			"envelope" : {
				"decay" : 0,
				"sustain" : 10
			},
			"volume": -38
		}).toMaster();

var instrument1_part = new Tone.Part(function(time, event){
	//the events will be given to the callback with the time they occur
	instrument1.triggerAttackRelease(event.note, event.dur, time)
}, [	{ time : '4n + 8n', note : 'E4', dur : '8n'},
	{ time : '1n', note : 'G4', dur : '16n'},
	{ time : '1n', note : 'B4', dur : '16n'},
	{ time : '1n', note : 'E4', dur : '16n'},
	{ time : '2n + 8t', note : 'B4', dur : '4n'}])

instrument1_part.start(0)
instrument1_part.loop = true
instrument1_part.loopEnd = '1m'

/// instrument2
var instrument2 = new Tone.MembraneSynth({
			"harmonicity" : 12,
			"resonance" : 800,
			"modulationIndex" : 20,
			"envelope" : {
				"decay" : 0.4,
			},
			"volume" : -11
		}).toMaster();

var instrument2_part = new Tone.Part(function(time, event){
	//the events will be given to the callback with the time they occur
	instrument2.triggerAttackRelease(event.note, event.dur, time)
}, [{ time : 0, note : 'C4', dur : '4n'},
	{ time : '4n + 8n', note : 'E4', dur : '8n'},
	{ time : '1n', note : 'G4', dur : '16n'},
	{ time : '1n', note : 'E4', dur : '16n'},
	{ time : '1n', note : 'B4', dur : '16n'},
	{ time : '2n', note : 'G4', dur : '16n'},
	{ time : '2n + 8t', note : 'B4', dur : '4n'}])

instrument2_part.start(0)
instrument2_part.loop = true
instrument2_part.loopEnd = '1m'

/// Start Music
Tone.Transport.start('+2')
