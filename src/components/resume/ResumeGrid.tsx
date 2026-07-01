import ResumeCard from "./ResumeCard";

interface Resume {
    _id: string;
    title: string;
    template: string;
    atsScore: number;
    updatedAt: string;
}

interface Props {
    resumes: Resume[];
    onDelete?: (id: string) => void;
}

export default function ResumeGrid({ resumes, onDelete }: Props) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
                <ResumeCard
                    key={resume._id}
                    {...resume}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
