import ScoreCard from "../shared/ScoreCard";

interface Props {
    score: number;
}

export default function MatchScoreCard({
    score,
}: Props) {
    return (
        <ScoreCard
            title="Job Match Score"
            score={score}
            description="Based on skills, keywords, and experience alignment."
        />
    );
}