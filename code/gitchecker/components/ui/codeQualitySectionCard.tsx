import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertTriangle, BookOpen, Code2, Copy } from "lucide-react";

function CodeQualitySectionCard(props) {
    let formattedData = props.formattedData;
    let title = props.title;
    let progressValue, pText;
    if(title == "Test Coverage") {
        progressValue = parseFloat(formattedData.qualityMetrics.testCoverage.coverage);
        pText = formattedData.qualityMetrics.testCoverage.testFilesCount + " test files / " + formattedData.qualityMetrics.testCoverage.sourceFilesCount + " source files";
    } else if( title == "Documentation Coverage") {
        progressValue = parseFloat(formattedData.qualityMetrics.docCoverage.coverage);
        pText = formattedData.qualityMetrics.docCoverage.docFilesCount + " doc files / " + formattedData.qualityMetrics.docCoverage.totalFiles + " total files";
    }

    return (
        <Card className="bg-gray-800/50 backdrop-blur border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white gap-2">
              {title == "Test Coverage" && <><Code2 className="h-5 w-5 text-blue-400" /> {title}</>}
              {title == "Documentation Coverage" && <><BookOpen className="h-5 w-5 text-green-400" /> {title}</>}
              {title == "Code Duplication" && <><Copy className="h-5 w-5 text-orange-400" /> {title}</>}
              {title == "Code Complexity" &&<><AlertTriangle className="h-5 w-5 text-red-400" /> {title}</>}
            </CardTitle>
          </CardHeader>
          <CardContent>
          <div className="flex flex-col items-center">
            {(title == "Test Coverage" || title == "Documentation Coverage") &&
                <>
                <div className="w-full mb-4">
                    <Progress value={progressValue} className="h-4" />
                </div>
                <p className="text-3xl font-bold text-green-400">{progressValue}%</p>
                <p className="text-sm text-gray-400 mt-2">
                    {pText}
                </p>
                </>
                }
            {title == "Code Duplication" && 
                <>
                <p className="text-3xl font-bold text-orange-400">
                    {formattedData.qualityMetrics.codeDuplication.totalDuplicates}
                </p>
                <p className="text-sm text-gray-400 mt-2">Duplicate Files</p>
                <ScrollArea className="h-24 w-full mt-4">
                    <div className="space-y-2">
                        {formattedData.qualityMetrics.codeDuplication.duplicates.map((file, index) => (
                            <div key={index} className="text-sm text-gray-300 bg-gray-700/50 px-2 py-1 rounded">
                                {file}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
              </>}
            {title == "Code Complexity" && 
                <>
                    <p className="text-3xl font-bold text-red-400">
                        {formattedData.qualityMetrics.codeComplexity.averageComplexity.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Average Complexity Score</p>
                    <div className="mt-4 w-full">
                        <div className="text-xs text-gray-400 mb-1">Complexity Scale</div>
                        <div className="grid grid-cols-5 gap-1">
                        <div className="h-1 bg-green-400 rounded"></div>
                        <div className="h-1 bg-yellow-400 rounded"></div>
                        <div className="h-1 bg-orange-400 rounded"></div>
                        <div className="h-1 bg-red-400 rounded"></div>
                        <div className="h-1 bg-pink-400 rounded"></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Simple</span>
                        <span>Complex</span>
                        </div>
                    </div>
                </>}
            </div>
          </CardContent>
        </Card>
    )

}

export { CodeQualitySectionCard }