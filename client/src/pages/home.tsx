import { useState } from "react";
import Header from "@/components/header";
import FileUpload from "@/components/file-upload";
import AnalysisResults from "@/components/analysis-results";
import TipsSection from "@/components/tips-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface AnalysisResult {
  id: number;
  title: string;
  description: string;
  status: "good" | "attention" | "info";
  message: string;
  color: string;
}

interface AnalysisData {
  uploadId: number;
  results: AnalysisResult[];
}

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [uploadCount, setUploadCount] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setUploadCount(prev => prev + 1);
    setTimeout(() => {
      scrollToSection('results');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Smile, <span className="text-blue-200">Analyzed</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Educational dental health insights through advanced image analysis. Learn about oral hygiene with personalized tips.
            </p>
            
            <Alert className="bg-yellow-100 text-yellow-800 border-yellow-200 p-4 mb-8 max-w-2xl mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm font-medium">
                ⚠️ Educational Purpose Only - This app provides general information and should not replace professional dental care.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => scrollToSection('scan')}
              className="bg-white text-[#2563EB] px-8 py-3 text-lg font-semibold hover:bg-gray-50 shadow-lg"
            >
              Start Your Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="scan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Scan Your Smile</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload a clear photo of your smile to receive educational insights about dental hygiene practices.
            </p>
          </div>
          
          <FileUpload onAnalysisComplete={handleAnalysisComplete} />
        </div>
      </section>

      {/* Analysis Results */}
      {analysisData && (
        <section id="results" className="py-20 bg-light-bg">
          <AnalysisResults data={analysisData} />
          
          {/* Professional Consultation Warning after 3 uploads */}
          {uploadCount >= 3 && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800 mb-2">Professional Consultation Recommended</h3>
                  <AlertDescription className="text-sm text-red-700">
                    <p>
                      You've uploaded multiple photos for analysis. While this app provides educational information, 
                      we strongly recommend consulting with a qualified dentist or dental hygienist for personalized 
                      advice and professional examination.
                    </p>
                    <p className="mt-2">
                      <strong>Schedule a dental appointment if you have specific concerns about your oral health.</strong>
                    </p>
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          )}
        </section>
      )}

      {/* Tips Section */}
      <section id="tips" className="py-20 bg-white">
        <TipsSection />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About SmileScan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              An educational project focused on promoting dental health awareness through accessible information and general wellness tips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Students learning about dental health" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                SmileScan is designed to make dental health education accessible and engaging. Through innovative technology and comprehensive resources, we aim to promote better oral hygiene habits and dental awareness.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Educational Focus</h4>
                    <p className="text-gray-600 text-sm">Providing general information about dental health and hygiene practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Accessibility</h4>
                    <p className="text-gray-600 text-sm">Making dental health knowledge accessible to everyone</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#F59E0B] rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovation</h4>
                    <p className="text-gray-600 text-sm">Using technology to enhance learning about oral health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-yellow-100 border-yellow-200">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Important Disclaimer</h3>
              <AlertDescription className="text-sm text-yellow-700 space-y-2">
                <p>
                  <strong>SmileScan is an educational tool only.</strong> This application provides general information about dental health and hygiene practices. It does not provide medical advice, diagnosis, or treatment recommendations.
                </p>
                <p>
                  The analysis and tips provided are based on general dental health principles and should not replace professional dental care. Always consult with a qualified dentist or dental hygienist for personalized advice and treatment.
                </p>
                <p>
                  If you have specific dental concerns or symptoms, please contact a dental professional immediately.
                </p>
              </AlertDescription>
            </div>
          </Alert>
        </div>
      </section>

      <Footer />
    </div>
  );
}
