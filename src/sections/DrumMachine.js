import React, { useState, useEffect, useRef } from 'react';

// Import or define the sound files
import kickSound from './kick.wav';
import snareSound from './snare.wav';
import hihatSound from './hihat.wav';
import tom1Sound from './tom1.wav';
import tom2Sound from './tom2.wav';

const sounds = [kickSound, snareSound, hihatSound, tom1Sound, tom2Sound];
const numRows = 5;  // Number of different sounds
const numCols = 16; // 4 bars in 4/4 time, assuming each column is a sixteenth note

const DrumMachine = () => {
    const [grid, setGrid] = useState(Array(numRows).fill().map(() => Array(numCols).fill(false)));
    const [tempo, setTempo] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const timerRef = useRef(null);
    const currentStepRef = useRef(currentStep);

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const toggleNote = (row, col) => {
        if (!grid[row][col]) {
            playSound(sounds[row]);
        }

        const newGrid = [...grid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = !newGrid[row][col];
        setGrid(newGrid);
    };

    const processStep = () => {
        const step = currentStepRef.current;
        for (let row = 0; row < numRows; row++) {
            if (grid[row][step]) {
                playSound(sounds[row]);
            }
        }

        const nextStep = (step + 1) % numCols;
        currentStepRef.current = nextStep;
        setCurrentStep(nextStep);
    };

    const startPlayback = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            clearInterval(timerRef.current); // Clear any existing interval
            processStep();
            const intervalDuration = (60000 / tempo) / 4;
            timerRef.current = setInterval(processStep, intervalDuration);
        }
    };

    const stopPlayback = () => {
        if (isPlaying) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            setCurrentStep(0);
        }
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div>
            <div className="grid">
                <div className="row header-row">
                    {Array.from({ length: numCols }, (_, i) => (
                        <div key={i} className="header-cell">{i % 4 === 0 ? (i / 4 + 1) : ''}</div>
                    ))}
                </div>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((col, colIndex) => (
                            <div key={colIndex}
                                className={`cell ${col ? 'active' : ''} ${colIndex === currentStep ? 'current-step' : ''}`}
                                onDoubleClick={() => toggleNote(rowIndex, colIndex)} />
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <input type="number" value={tempo} onChange={(e) => setTempo(e.target.value)} />
                <button onClick={startPlayback}>Start</button>
                <button onClick={stopPlayback}>Stop</button>
            </div>
        </div>
    );
};

export default DrumMachine;
