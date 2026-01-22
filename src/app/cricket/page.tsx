'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Target, TrendingUp, Zap, Activity } from 'lucide-react';
import Link from 'next/link';
import BackgroundParallax from '@/components/ui/BackgroundParallax';

// Cricket calculation utilities
const calculateRequiredRunRate = (target: number, currentScore: number, oversRemaining: number): number => {
    if (oversRemaining <= 0) return 0;
    const runsNeeded = target - currentScore;
    return runsNeeded / oversRemaining;
};

const calculateProjectedScore = (currentScore: number, currentOvers: number, totalOvers: number): number => {
    if (currentOvers <= 0) return currentScore;
    const runRate = currentScore / currentOvers;
    return Math.round(runRate * totalOvers);
};

const calculateWinProbability = (
    currentScore: number,
    target: number,
    wicketsLost: number,
    oversRemaining: number
): number => {
    if (oversRemaining <= 0) return currentScore >= target ? 100 : 0;
    if (wicketsLost >= 10) return 0;

    const runsNeeded = target - currentScore;
    const requiredRunRate = runsNeeded / oversRemaining;
    const currentRunRate = currentScore / (20 - oversRemaining); // Assuming T20

    // Simple probability model
    let probability = 50;

    if (currentScore >= target) return 100;
    if (runsNeeded <= 0) return 100;

    // Adjust based on required run rate
    if (requiredRunRate > 12) probability -= 30;
    else if (requiredRunRate > 10) probability -= 20;
    else if (requiredRunRate > 8) probability -= 10;
    else if (requiredRunRate < 6) probability += 20;

    // Adjust based on wickets
    probability -= (wicketsLost * 5);

    // Adjust based on overs remaining
    if (oversRemaining < 3) probability -= 10;

    return Math.max(0, Math.min(100, probability));
};

export default function CricketCalculator() {
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [oversCompleted, setOversCompleted] = useState<number>(0);
    const [wicketsFallen, setWicketsFallen] = useState<number>(0);
    const [target, setTarget] = useState<number>(0);
    const [totalOvers, setTotalOvers] = useState<number>(20);

    const [requiredRunRate, setRequiredRunRate] = useState<number>(0);
    const [projectedScore, setProjectedScore] = useState<number>(0);
    const [winProbability, setWinProbability] = useState<number>(0);
    const [currentRunRate, setCurrentRunRate] = useState<number>(0);

    // Track over-by-over data for graph
    const [overData, setOverData] = useState<Array<{ over: number; score: number; runRate: number }>>([]);

    // Live match counter state
    const [ballsInCurrentOver, setBallsInCurrentOver] = useState<number>(0);
    const [currentOverRuns, setCurrentOverRuns] = useState<number[]>([]);

    // Tab state
    const [activeTab, setActiveTab] = useState<'live' | 'calculator' | 'analytics'>('live');

    // Helper functions for live counter
    const addRuns = (runs: number) => {
        setCurrentScore(prev => prev + runs);
        setCurrentOverRuns(prev => [...prev, runs]);
        setBallsInCurrentOver(prev => {
            const newBalls = prev + 1;
            if (newBalls === 6) {
                // Over complete
                setOversCompleted(prevOvers => prevOvers + 1);
                setBallsInCurrentOver(0);
                setCurrentOverRuns([]);
            }
            return newBalls === 6 ? 0 : newBalls;
        });
    };

    const addWicket = () => {
        if (wicketsFallen < 10) {
            setWicketsFallen(prev => prev + 1);
            setBallsInCurrentOver(prev => {
                const newBalls = prev + 1;
                if (newBalls === 6) {
                    setOversCompleted(prevOvers => prevOvers + 1);
                    setBallsInCurrentOver(0);
                    setCurrentOverRuns([]);
                }
                return newBalls === 6 ? 0 : newBalls;
            });
            setCurrentOverRuns(prev => [...prev, -1]); // -1 represents wicket
        }
    };

    const undoLastBall = () => {
        if (currentOverRuns.length > 0) {
            const lastBall = currentOverRuns[currentOverRuns.length - 1];
            if (lastBall === -1) {
                // Undo wicket
                setWicketsFallen(prev => Math.max(0, prev - 1));
            } else {
                // Undo runs
                setCurrentScore(prev => Math.max(0, prev - lastBall));
            }
            setCurrentOverRuns(prev => prev.slice(0, -1));
            setBallsInCurrentOver(prev => Math.max(0, prev - 1));
        } else if (oversCompleted > 0) {
            // Go back to previous over
            setOversCompleted(prev => prev - 1);
            setBallsInCurrentOver(5);
        }
    };

    useEffect(() => {
        const totalBalls = (oversCompleted * 6) + ballsInCurrentOver;
        const actualOvers = oversCompleted + (ballsInCurrentOver / 6); // Corrected to divide by 6 for overs

        const oversRemaining = totalOvers - actualOvers;
        const rrr = calculateRequiredRunRate(target, currentScore, oversRemaining);
        const projected = calculateProjectedScore(currentScore, actualOvers, totalOvers);
        const winProb = target > 0 ? calculateWinProbability(currentScore, target, wicketsFallen, oversRemaining) : 50;
        const crr = actualOvers > 0 ? currentScore / actualOvers : 0;

        setRequiredRunRate(rrr);
        setProjectedScore(projected);
        setWinProbability(winProb);
        setCurrentRunRate(crr);

        // Update graph data
        if (actualOvers > 0) {
            const newDataPoint = {
                over: actualOvers,
                score: currentScore,
                runRate: crr
            };

            // Check if this over already exists, update or add
            setOverData(prev => {
                const existingIndex = prev.findIndex(d => Math.abs(d.over - actualOvers) < 0.01);
                if (existingIndex >= 0) {
                    const updated = [...prev];
                    updated[existingIndex] = newDataPoint;
                    return updated;
                }
                return [...prev, newDataPoint].sort((a, b) => a.over - b.over);
            });
        }
    }, [currentScore, oversCompleted, ballsInCurrentOver, wicketsFallen, target, totalOvers]);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Static Background Image */}
            <div className="cosmic-background" />
            <BackgroundParallax />

            {/* Main Content */}
            <main className="relative z-10 px-6 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-cosmic-cyan hover:text-cosmic-blue transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Portfolio
                        </Link>

                        <div className="text-center mb-8">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cosmic-blue/30 bg-cosmic-blue/10 px-4 py-1.5 backdrop-blur-md">
                                <Activity className="h-4 w-4 text-cosmic-blue" />
                                <span className="text-xs text-cosmic-blue font-bold tracking-widest uppercase">Trajectory Prediction System</span>
                            </div>
                            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4 name-glow">
                                CRICKET MATCH CALCULATOR
                            </h1>
                            <p className="text-lg text-secondary max-w-2xl mx-auto">
                                Like plotting a spacecraft landing, but for match outcomes. Real-time trajectory analysis for cricket matches.
                            </p>
                        </div>
                        {/* Current Over Display */}
                        <div className="mb-6 p-4 rounded-lg bg-black/30 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-muted uppercase tracking-wider">Current Over</span>
                                <span className="text-lg font-bold text-white">
                                    {oversCompleted}.{ballsInCurrentOver}
                                </span>
                            </div>

                            {/* Ball-by-ball display */}
                            <div className="flex gap-2 flex-wrap">
                                {currentOverRuns.map((run, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${run === -1
                                            ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                                            : run === 0
                                                ? 'bg-white/10 border border-white/20 text-muted'
                                                : run === 4
                                                    ? 'bg-cosmic-blue/20 border-2 border-cosmic-blue text-cosmic-blue'
                                                    : run === 6
                                                        ? 'bg-cosmic-purple/20 border-2 border-cosmic-purple text-cosmic-purple'
                                                        : 'bg-cosmic-cyan/20 border border-cosmic-cyan text-cosmic-cyan'
                                            }`}
                                    >
                                        {run === -1 ? 'W' : run}
                                    </div>
                                ))}
                                {/* Empty balls */}
                                {Array.from({ length: 6 - currentOverRuns.length }).map((_, idx) => (
                                    <div
                                        key={`empty-${idx}`}
                                        className="w-8 h-8 rounded-full border border-dashed border-white/10"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Scoring Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {/* Run Buttons */}
                            <div>
                                <p className="text-xs text-muted uppercase tracking-wider mb-2">Add Runs</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[0, 1, 2, 3, 4, 5, 6].map((runs) => (
                                        <button
                                            key={runs}
                                            onClick={() => addRuns(runs)}
                                            disabled={ballsInCurrentOver >= 6}
                                            className={`px-4 py-3 rounded-lg border font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${runs === 0
                                                ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                                                : runs === 4
                                                    ? 'border-cosmic-blue bg-cosmic-blue/10 text-cosmic-blue hover:bg-cosmic-blue/20'
                                                    : runs === 6
                                                        ? 'border-cosmic-purple bg-cosmic-purple/10 text-cosmic-purple hover:bg-cosmic-purple/20'
                                                        : 'border-cosmic-cyan bg-cosmic-cyan/10 text-cosmic-cyan hover:bg-cosmic-cyan/20'
                                                }`}
                                        >
                                            {runs}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Wicket & Undo */}
                            <div>
                                <p className="text-xs text-muted uppercase tracking-wider mb-2">Actions</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={addWicket}
                                        disabled={wicketsFallen >= 10 || ballsInCurrentOver >= 6}
                                        className="px-4 py-3 rounded-lg border border-red-500 bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        WICKET
                                    </button>
                                    <button
                                        onClick={undoLastBall}
                                        disabled={currentOverRuns.length === 0 && oversCompleted === 0}
                                        className="px-4 py-3 rounded-lg border border-cosmic-orange bg-cosmic-orange/10 text-cosmic-orange font-bold hover:bg-cosmic-orange/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        UNDO
                                    </button>
                                </div>

                                {/* Extras */}
                                <p className="text-xs text-muted uppercase tracking-wider mt-3 mb-2">Extras</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => addRuns(1)}
                                        className="px-2 py-2 rounded-lg border border-white/20 bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-all"
                                    >
                                        WD
                                    </button>
                                    <button
                                        onClick={() => addRuns(1)}
                                        className="px-2 py-2 rounded-lg border border-white/20 bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-all"
                                    >
                                        NB
                                    </button>
                                    <button
                                        onClick={() => addRuns(1)}
                                        className="px-2 py-2 rounded-lg border border-white/20 bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-all"
                                    >
                                        BYE
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-3 p-4 rounded-lg bg-black/20 border border-white/5">
                            <div className="text-center">
                                <p className="text-xs text-muted mb-1">Score</p>
                                <p className="text-xl font-bold text-white">{currentScore}/{wicketsFallen}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted mb-1">Overs</p>
                                <p className="text-xl font-bold text-cosmic-cyan">{oversCompleted}.{ballsInCurrentOver}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted mb-1">Run Rate</p>
                                <p className="text-xl font-bold text-cosmic-purple">{currentRunRate.toFixed(2)}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted mb-1">This Over</p>
                                <p className="text-xl font-bold text-cosmic-teal">
                                    {currentOverRuns.filter(r => r >= 0).reduce((sum, r) => sum + r, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* Input Panel */}
                        <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 card-glow">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Target className="h-6 w-6 text-cosmic-blue" />
                                Match Parameters
                            </h2>

                            <div className="space-y-6">
                                {/* Current Score */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Current Score
                                    </label>
                                    <input
                                        type="number"
                                        value={currentScore}
                                        onChange={(e) => setCurrentScore(Number(e.target.value))}
                                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-muted focus:border-cosmic-blue focus:outline-none focus:ring-2 focus:ring-cosmic-blue/50"
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>

                                {/* Overs Completed */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Overs Completed
                                    </label>
                                    <input
                                        type="number"
                                        value={oversCompleted}
                                        onChange={(e) => setOversCompleted(Number(e.target.value))}
                                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-muted focus:border-cosmic-blue focus:outline-none focus:ring-2 focus:ring-cosmic-blue/50"
                                        placeholder="0"
                                        min="0"
                                        max={totalOvers}
                                        step="0.1"
                                    />
                                </div>

                                {/* Wickets Fallen */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Wickets Fallen
                                    </label>
                                    <input
                                        type="number"
                                        value={wicketsFallen}
                                        onChange={(e) => setWicketsFallen(Number(e.target.value))}
                                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-muted focus:border-cosmic-blue focus:outline-none focus:ring-2 focus:ring-cosmic-blue/50"
                                        placeholder="0"
                                        min="0"
                                        max="10"
                                    />
                                </div>

                                {/* Target */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Target (if chasing)
                                    </label>
                                    <input
                                        type="number"
                                        value={target}
                                        onChange={(e) => setTarget(Number(e.target.value))}
                                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-muted focus:border-cosmic-blue focus:outline-none focus:ring-2 focus:ring-cosmic-blue/50"
                                        placeholder="0 (leave empty if batting first)"
                                        min="0"
                                    />
                                </div>

                                {/* Total Overs */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Total Overs (Match Format)
                                    </label>

                                    {/* Preset Format Buttons */}
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        <button
                                            onClick={() => setTotalOvers(20)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${totalOvers === 20
                                                ? 'border-cosmic-blue bg-cosmic-blue/20 text-cosmic-blue'
                                                : 'border-white/20 bg-white/5 text-secondary hover:border-cosmic-blue/50'
                                                }`}
                                        >
                                            <div className="text-xs font-bold">T20</div>
                                            <div className="text-[10px] opacity-70">20 overs</div>
                                        </button>
                                        <button
                                            onClick={() => setTotalOvers(50)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${totalOvers === 50
                                                ? 'border-cosmic-purple bg-cosmic-purple/20 text-cosmic-purple'
                                                : 'border-white/20 bg-white/5 text-secondary hover:border-cosmic-purple/50'
                                                }`}
                                        >
                                            <div className="text-xs font-bold">ODI</div>
                                            <div className="text-[10px] opacity-70">50 overs</div>
                                        </button>
                                        <button
                                            onClick={() => setTotalOvers(10)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${totalOvers === 10
                                                ? 'border-cosmic-teal bg-cosmic-teal/20 text-cosmic-teal'
                                                : 'border-white/20 bg-white/5 text-secondary hover:border-cosmic-teal/50'
                                                }`}
                                        >
                                            <div className="text-xs font-bold">T10</div>
                                            <div className="text-[10px] opacity-70">10 overs</div>
                                        </button>
                                    </div>

                                    {/* Custom Overs Input */}
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={totalOvers}
                                            onChange={(e) => setTotalOvers(Number(e.target.value))}
                                            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-muted focus:border-cosmic-orange focus:outline-none focus:ring-2 focus:ring-cosmic-orange/50"
                                            placeholder="Custom overs"
                                            min="1"
                                            max="100"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">
                                            Custom
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="space-y-6">

                            {/* Win Probability - Circular Chart */}
                            <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 card-glow text-center">
                                <h3 className="text-lg font-semibold text-secondary mb-6">Win Probability</h3>

                                <div className="relative inline-flex items-center justify-center">
                                    {/* SVG Circle */}
                                    <svg className="transform -rotate-90" width="200" height="200">
                                        {/* Background circle */}
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="80"
                                            stroke="rgba(255, 255, 255, 0.1)"
                                            strokeWidth="12"
                                            fill="none"
                                        />
                                        {/* Progress circle */}
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="80"
                                            stroke="url(#winGradient)"
                                            strokeWidth="12"
                                            fill="none"
                                            strokeDasharray={`${(winProbability / 100) * 502.4} 502.4`}
                                            strokeLinecap="round"
                                            className="transition-all duration-500"
                                        />
                                        <defs>
                                            <linearGradient id="winGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#22d3ee" />
                                                <stop offset="100%" stopColor="#60a5fa" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Center text */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-white name-glow">
                                            {winProbability.toFixed(0)}%
                                        </span>
                                        <span className="text-xs text-muted uppercase tracking-wider mt-1">
                                            {winProbability > 60 ? 'Favorable' : winProbability > 40 ? 'Balanced' : 'Challenging'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">

                                {/* Current Run Rate */}
                                <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 card-glow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity className="h-4 w-4 text-cosmic-cyan" />
                                        <span className="text-xs text-muted uppercase tracking-wider">Current RR</span>
                                    </div>
                                    <p className="text-3xl font-bold text-cosmic-cyan">
                                        {currentRunRate.toFixed(2)}
                                    </p>
                                </div>

                                {/* Required Run Rate */}
                                <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 card-glow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="h-4 w-4 text-cosmic-orange" />
                                        <span className="text-xs text-muted uppercase tracking-wider">Required RR</span>
                                    </div>
                                    <p className="text-3xl font-bold text-cosmic-orange">
                                        {target > 0 ? requiredRunRate.toFixed(2) : '--'}
                                    </p>
                                </div>

                                {/* Projected Score */}
                                <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 card-glow col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="h-4 w-4 text-cosmic-purple" />
                                        <span className="text-xs text-muted uppercase tracking-wider">Projected Final Score</span>
                                    </div>
                                    <p className="text-4xl font-bold text-cosmic-purple">
                                        {projectedScore}
                                    </p>
                                    {target > 0 && (
                                        <p className="text-sm text-secondary mt-2">
                                            {projectedScore >= target
                                                ? `${projectedScore - target} runs above target`
                                                : `${target - projectedScore} runs short of target`}
                                        </p>
                                    )}
                                </div>

                                {/* Match Status */}
                                <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 card-glow col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="h-4 w-4 text-cosmic-teal" />
                                        <span className="text-xs text-muted uppercase tracking-wider">Match Status</span>
                                    </div>
                                    <p className="text-lg font-semibold text-white">
                                        {currentScore}/{wicketsFallen} ({oversCompleted} ov)
                                    </p>
                                    {target > 0 && (
                                        <p className="text-sm text-secondary mt-1">
                                            Need {Math.max(0, target - currentScore)} runs from {(totalOvers - oversCompleted).toFixed(1)} overs
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Run Rate Progression Graph */}
                    {overData.length > 0 && (
                        <div className="mt-8 rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 card-glow">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-cosmic-cyan" />
                                Run Rate Progression
                            </h3>

                            <div className="relative w-full h-64 bg-black/20 rounded-lg p-4">
                                <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#22d3ee" />
                                            <stop offset="50%" stopColor="#60a5fa" />
                                            <stop offset="100%" stopColor="#a78bfa" />
                                        </linearGradient>
                                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
                                            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.05)" />
                                        </linearGradient>
                                    </defs>

                                    {/* Grid lines */}
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <line key={`grid-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                    ))}

                                    {(() => {
                                        const maxRunRate = Math.max(...overData.map(d => d.runRate), target > 0 ? requiredRunRate : 0, 12);
                                        const scaleY = (runRate: number) => 240 - (runRate / maxRunRate) * 220;
                                        const scaleX = (over: number) => (over / totalOvers) * 800;
                                        const areaPath = overData.length > 0 ? `M 0,240 L ${overData.map(d => `${scaleX(d.over)},${scaleY(d.runRate)}`).join(' L ')} L ${scaleX(overData[overData.length - 1].over)},240 Z` : '';
                                        const linePath = overData.length > 0 ? `M ${overData.map(d => `${scaleX(d.over)},${scaleY(d.runRate)}`).join(' L ')}` : '';

                                        return (
                                            <>
                                                {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}
                                                {target > 0 && requiredRunRate > 0 && (
                                                    <line x1="0" y1={scaleY(requiredRunRate)} x2="800" y2={scaleY(requiredRunRate)} stroke="#fb923c" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                                                )}
                                                {linePath && <path d={linePath} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                                                {overData.map((d, i) => (
                                                    <g key={i}>
                                                        <circle cx={scaleX(d.over)} cy={scaleY(d.runRate)} r="4" fill="#22d3ee" stroke="#000" strokeWidth="2" />
                                                        <title>{`Over ${d.over.toFixed(1)}: ${d.score} runs (RR: ${d.runRate.toFixed(2)})`}</title>
                                                    </g>
                                                ))}
                                            </>
                                        );
                                    })()}
                                </svg>

                                <div className="absolute bottom-2 right-2 flex gap-4 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-0.5 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple"></div>
                                        <span className="text-muted">Current RR</span>
                                    </div>
                                    {target > 0 && (
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-0.5 bg-cosmic-orange opacity-60" style={{ borderTop: '2px dashed' }}></div>
                                            <span className="text-muted">Required RR</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Highest RR</p>
                                    <p className="text-lg font-bold text-cosmic-cyan">{overData.length > 0 ? Math.max(...overData.map(d => d.runRate)).toFixed(2) : '--'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Average RR</p>
                                    <p className="text-lg font-bold text-cosmic-purple">{overData.length > 0 ? (overData.reduce((sum, d) => sum + d.runRate, 0) / overData.length).toFixed(2) : '--'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Data Points</p>
                                    <p className="text-lg font-bold text-cosmic-teal">{overData.length}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="mt-12 rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 card-glow">
                        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <h4 className="text-cosmic-blue font-semibold mb-2">Required Run Rate</h4>
                                <p className="text-sm text-secondary">
                                    Calculates the runs per over needed to reach the target based on remaining overs.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-cosmic-purple font-semibold mb-2">Projected Score</h4>
                                <p className="text-sm text-secondary">
                                    Estimates final score by extrapolating current run rate to full innings.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-cosmic-teal font-semibold mb-2">Win Probability</h4>
                                <p className="text-sm text-secondary">
                                    Simple model considering run rate, wickets, and overs remaining.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
