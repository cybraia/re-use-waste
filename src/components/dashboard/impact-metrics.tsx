import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, Trash2, Leaf } from "lucide-react";

const metrics = [
    {
        icon: ArrowRightLeft,
        title: "Total Waste Exchanged",
        value: "1,250 Tons",
        description: "Materials successfully diverted.",
    },
    {
        icon: Leaf,
        title: "CO2 Reduction",
        value: "3,125 Tons",
        description: "Estimated emissions saved.",
    },
    {
        icon: Trash2,
        title: "Landfill Reduction",
        value: "98%",
        description: "Of listed waste found a new purpose.",
    }
];

export default function ImpactMetrics() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
                <Card key={metric.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
