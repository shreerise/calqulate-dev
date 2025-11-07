import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import FaceShapeCalculator from "@/components/calculators/face-shape-calculator"; // Import the calculator component
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Camera,
  Ruler,
  BrainCircuit,
  Lock,
  Smartphone,
  Users,
  CheckCircle,
  XCircle,
  Upload,
  Sparkles,
  Glasses,
  Scissors,
  Paintbrush,
  Crown,
  MonitorPlay,
  Zap,
  Calculator,
  MonitorSmartphone,
  ShieldCheck,
  Cpu,
  Palette,
  Smile, // Added for consistency
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI Face Shape Calculator: Discover Your Shape & Style",
  description:
    "Instantly detect your face shape with AI! Get personalized hairstyle, glasses, and makeup tips—all private, secure, and beautifully accurate.",
  keywords:
    "face shape calculator, calculate my face shape, face calculator shape, shape face calculator, how to determine face shape calculator, AI face shape detector, determine face shape, face shape analysis, face type, hairstyle for face shape, glasses for face shape, makeup for face shape, face shape tool, online face shape",
};

const faqs = [
  {
    question: "How to determine my face shape?",
    answer:
      "You can upload a selfie for instant AI detection or enter your facial measurements manually for a private calculation.",
  },
  {
    question: "Is my photo stored or shared?",
    answer:
      "No, your photo is processed once for analysis and then deleted immediately.",
  },
  {
    question: "Can I use this face shape detector on a mobile device?",
    answer:
      "Yes, it functions flawlessly on all mobile browsers and devices without the requirement of an app.",
  },
  {
    question: "Does the tool yield accurate results for men and women?",
    answer:
      "Absolutely, the algorithm is optimized for all facial structures and genders.",
  },
  {
    question: "What if my face doesn't fit one exact category?",
    answer:
      "That's completely normal. Most people have a combination of features, and the calculator will indicate your closest match, with suggestions for both styles.",
  },
];

const VerticalStepper = ({
  steps,
}: {
  steps: { title: string; description: string }[];
}) => {
  return (
    <div className="relative pl-8">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`relative ${index < steps.length - 1 ? "pb-10" : "pb-0"}`}
        >
          {index < steps.length - 1 && (
            <div className="absolute top-2 left-[1px] w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
          )}
          <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"></div>
          <div className="pl-6">
            <h3 className="text-lg font-semibold text-primary">
              Step {String(index + 1).padStart(2, "0")}
            </h3>
            <p className="font-bold mt-1">{step.title}</p>
            <p className="text-muted-foreground mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function FaceShapeCalculatorPage() {
  const howToUseAISteps = [
    {
      title: "Click 'Upload Your Photo'.",
      description: "Start by selecting the upload option.",
    },
    {
      title: "Your face should be well lit and completely visible, with no filters or glasses.",
      description: "Ensure optimal photo conditions for best results.",
    },
    {
      title: "Our AI face shape detector automatically analyzes your facial features.",
      description: "Let our advanced AI do the work.",
    },
    {
      title: "Get instant results with your face shape type and personalized styling tips.",
      description: "Receive your analysis and recommendations immediately.",
    },
  ];

  const howToUseManualSteps = [
    {
      title: "If you do not want to upload a photo, switch to manual mode.",
      description: "Choose privacy and manual input.",
    },
    {
      title: "Using a ruler or measuring tape, measure your forehead, cheekbones, jawline, and face length.",
      description: "Gather your key facial measurements.",
    },
    {
      title: "Enter your numbers into the calculator fields:",
      description: "Input your precise measurements.",
    },
    {
      title: "Select your chin shape (round, medium, or sharp).",
      description: "Refine your profile with chin shape.",
    },
    {
      title: "Click 'Calculate My Face Shape'.",
      description: "Get your result instantly, without sharing any image or personal data.",
    },
  ];

  const aiDetectorWorksSteps = [
    {
      title: "Face Detection",
      description: "AI identifies your face boundaries and key landmarks such as forehead, cheekbones, jawline, and chin.",
    },
    {
      title: "Feature Mapping",
      description: "It measures distances and ratios between facial points.",
    },
    {
      title: "Shape Matching",
      description: "The system compares your data with a shape model which has been trained on thousands of real faces.",
    },
    {
      title: "Instant Result",
      description: "Your face shape appears with a visual overlay and styling advice.",
    },
  ];

  const faceShapes = [
    {
      name: "Oval",
      description: "Face length is longer than the width of the cheekbones; forehead is wider than the jawline. Considered balanced.",
      image: "/face-shapes/oval.png",
      styling: "Most styles work well; avoid covering up balanced features."
    },
    {
      name: "Round",
      description: "Face length and cheekbone width are similar. Soft, curved jawline.",
      image: "/face-shapes/round.png",
      styling: "Add height and length to elongate the face. Avoid width at the cheeks."
    },
    {
      name: "Square",
      description: "All measurements are fairly similar. Jawline is sharp and angular.",
      image: "/face-shapes/square.png",
      styling: "Soften the strong angles with texture, waves, or round frames."
    },
    {
      name: "Oblong",
      description: "Face length is the greatest measurement. Forehead, cheekbones, and jawline are similar in width.",
      image: "/face-shapes/oblong.png",
      styling: "Create an illusion of width with volume on the sides. Avoid adding height."
    },
    {
      name: "Heart",
      description: "Forehead is the widest, with a narrow jawline and a pointed chin.",
      image: "/face-shapes/heart.png",
      styling: "Add volume to the lower part of the face to balance the wider forehead."
    },
    {
      name: "Diamond",
      description: "Cheekbones are the widest part of the face. Forehead and jawline are narrow and similar in width.",
      image: "/face-shapes/diamond.png",
      styling: "Soften the cheekbones and add fullness to the forehead and chin areas."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="AI Face Shape Calculator"
        description="Instantly determine your face shape with AI for personalized style advice."
        url="https://calqulate.net/health/face-shape-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                AI Face Shape Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Your face tells a story, and understanding its shape helps in picking up the perfect hairstyle, glasses, or even the right makeup look.
                Our AI Face Shape Calculator helps you calculate your face shape instantly using advanced AI detection or manual measurement, while keeping your privacy 100% secure.
              </p>
            </div>

            {/* --- CALCULATOR COMPONENT INSERTED HERE --- */}
            <FaceShapeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              <section>
                <h2 className="mb-2"><b>Why Use Our Face Shape Calculator?</b></h2>
                <p>No two faces are the same, and neither should your styling choices be. Intelligent facial mapping applied to our Face Shape Detector AI identifies your face type and unlocks personalized style suggestions that really work for you.</p><br></br>
                <p className="text-center font-semibold mb-8">Here's what makes our tool special:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex flex-col items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-green-500" />
                        Private & Secure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Your image is never stored. Analysis happens right away and gets deleted after processing.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex flex-col items-center gap-2">
                        <Cpu className="w-8 h-8 text-blue-500" />
                        Dual Mode
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Either AI face shape detector (upload photo) or calculator with manual input (add measurements).</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex flex-col items-center gap-2">
                        <CheckCircle className="w-8 h-8 text-purple-500" />
                        Accurate Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Our AI model compares more than 60 facial landmarks for high precision.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex flex-col items-center gap-2">
                        <MonitorSmartphone className="w-8 h-8 text-yellow-500" />
                        Works on All Devices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">No installation of an app is required. Works flawlessly on mobile, tablet, or desktop.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex flex-col items-center gap-2">
                        <Users className="w-8 h-8 text-red-500" />
                        For Everyone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Designed for both men and women, with universal compatibility.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>How to Use the Calculator: AI vs. Manual</b></h2>
                <p>You can determine your face shape in two easy ways. Use the AI for speed and convenience, or the manual mode for complete privacy if you prefer not to upload a photo.</p>
                <div className="grid md:grid-cols-2 gap-8 not-prose mt-6">
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5"/>Option 1: AI Detector</CardTitle><CardDescription>Instant & Smart</CardDescription></CardHeader>
                        <CardContent>
                            <ol className="list-decimal pl-5 space-y-2 text-sm">
                                <li>Select the "From Photo" tab in the calculator.</li>
                                <li>Click "Load Analyzer" to activate the on-device AI.</li>
                                <li>Upload a clear, front-facing photo.</li>
                                <li>Get your results and analysis instantly.</li>
                            </ol>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5"/>Option 2: Manual Input</CardTitle><CardDescription>100% Private</CardDescription></CardHeader>
                        <CardContent>
                           <ol className="list-decimal pl-5 space-y-2 text-sm">
                                <li>Select the "Manual" tab in the calculator.</li>
                                <li>Use a tape measure for your face, forehead, cheekbones, and jawline.</li>
                                <li>Enter the values into the corresponding fields.</li>
                                <li>Click "Classify Face Shape" for your result.</li>
                           </ol>
                        </CardContent>
                    </Card>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-2">How to Take or Upload the Perfect Photo for Accurate Results</h2>
                <p className="mb-6">For the most accurate result with our face shape detector AI, ensure that your photo follows these simple guidelines. A clear and well-framed image allows the AI to identify your correct facial landmarks.</p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg text-green-600 mb-3">Do This</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Use natural or bright indoor lighting. Make sure your face is evenly lit.</li>
                            <li>Keep your head centered, facing directly into the camera.</li>
                            <li>Remove glasses, hats, and headphones so your face is fully visible.</li>
                            <li>Keep your whole face in the frame, from the top of your forehead to your chin.</li>
                            <li>Use a neutral facial expression without a smile or any exaggerated expression.</li>
                            <li>If the hair is covering your jawline, just pull it back or away from your face.</li>
                            <li>Take the photo in portrait mode for best clarity.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-3">Avoid This</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Taking pictures in dim or uneven lighting conditions.</li>
                            <li>Tilting or turning your head at an angle.</li>
                            <li>Using filters, beauty effects, or heavy makeup.</li>
                            <li>Posting group photos or cropped images.</li>
                            <li>Letting hair cover your face or cheekbones.</li>
                            <li>Using outdated or blurry photographs.</li>
                        </ul>
                    </div>
                </div>
                <p className="mt-6 text-center text-muted-foreground">A clear, well-lit, front-facing image gives the AI the best chance to detect your true face shape accurately.</p>
              </section>

              {/* NEW FACE SHAPE IMAGES SECTION */}
              <section>
                <h2 className="mb-2"><b>Visual Guide to Face Shapes</b></h2>
                <p className="mb-6">Understanding the different face shapes is easier when you can see visual examples. Here's a comprehensive guide to help you identify the main face shape categories:</p>
                
                {/* Image with caption in the style you requested */}
<div className="grid md:grid-cols-1 gap-8 my-8 not-prose">
  <div className="p-4 border rounded-xl shadow-sm bg-card flex flex-col items-center">
    <Image 
      src="/face-shape-comparison.jpg" 
      alt="Visual comparison of different face shapes showing oval, round, square, heart, diamond, and oblong shapes with their key characteristics." 
      width={600} 
      height={350} 
      className="mx-auto rounded-lg"
    />
    <p className="text-center text-sm mt-3 text-muted-foreground">
      Fig 1: Comparison of common face shapes and their distinctive features.
    </p>
  </div>
</div>

{/* Face shape cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center">
  {faceShapes.map((shape, index) => (
    <Card key={index} className="text-center w-full max-w-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
          <Image
            src={shape.image}
            alt={shape.name}
            fill
            className="object-contain rounded-full"
          />
        </div>
        <CardTitle className="text-xl font-semibold">{shape.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center px-4">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          {shape.description}
        </p>
        <div className="bg-muted p-3 rounded-lg text-center w-full">
          <p className="text-xs font-semibold">Styling Tip:</p>
          <p className="text-xs">{shape.styling}</p>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


                
             <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    Pro Tip: Identify Your Dominant Features
                  </h3>
                  <p className="text-sm">
                    Most people have a combination of features rather than a perfect geometric shape. Look for your <strong>dominant characteristics</strong> - 
                    is your jawline your most prominent feature? Are your cheekbones the widest part? Focus on these key areas to determine your primary face shape.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="mb-2"><b>The Main Types of Face Shapes Explained</b></h2>
                <p>Our tool analyzes your features to classify your face into one of the common shapes. Each one has its own unique characteristics and styling considerations.</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead><tr><th className="p-2 text-left">Shape</th><th className="p-2 text-left">Key Characteristics</th><th className="p-2 text-left">Styling Goal</th></tr></thead>
                    <tbody>
                      <tr className="border-t"><td className="p-2 font-bold">Oval</td><td className="p-2">Face length is longer than the width of the cheekbones; forehead is wider than the jawline. Considered balanced.</td><td className="p-2">Most styles work well; avoid covering up balanced features.</td></tr>
                      <tr className="border-t bg-muted/50"><td className="p-2 font-bold">Round</td><td className="p-2">Face length and cheekbone width are similar. Soft, curved jawline.</td><td className="p-2">Add height and length to elongate the face. Avoid width at the cheeks.</td></tr>
                      <tr className="border-t"><td className="p-2 font-bold">Square</td><td className="p-2">All measurements are fairly similar. Jawline is sharp and angular.</td><td className="p-2">Soften the strong angles with texture, waves, or round frames.</td></tr>
                      <tr className="border-t bg-muted/50"><td className="p-2 font-bold">Oblong</td><td className="p-2">Face length is the greatest measurement. Forehead, cheekbones, and jawline are similar in width.</td><td className="p-2">Create an illusion of width with volume on the sides. Avoid adding height.</td></tr>
                      <tr className="border-t"><td className="p-2 font-bold">Heart</td><td className="p-2">Forehead is the widest, with a narrow jawline and a pointed chin.</td><td className="p-2">Add volume to the lower part of the face to balance the wider forehead.</td></tr>
                      <tr className="border-t bg-muted/50"><td className="p-2 font-bold">Diamond</td><td className="p-2">Cheekbones are the widest part of the face. Forehead and jawline are narrow and similar in width.</td><td className="p-2">Soften the cheekbones and add fullness to the forehead and chin areas.</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>Why Knowing Your Face Shape Matters</b></h2>
                <p>Understanding your face shape is the first step to making informed style choices that enhance your natural features. It empowers you to select flattering haircuts, glasses, and makeup techniques that create balance and highlight your best attributes.</p><br></br>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 not-prose">
                    <Card>
                        <CardHeader className="items-center">
                           <Glasses className="w-10 h-10 text-blue-500 mb-2" />
                           <CardTitle className="text-lg">Pick the right glasses</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm">
                           Find frames that balance out your facial proportions.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="items-center">
                           <Scissors className="w-10 h-10 text-gray-500 mb-2" />
                           <CardTitle className="text-lg">Pick the right haircut</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm">
                           Never guess again, know what truly flatters your features.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="items-center">
                           <Palette className="w-10 h-10 text-pink-500 mb-2" />
                           <CardTitle className="text-lg">Improve makeup</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm">
                           Apply highlights and shadows precisely where they work best.
                        </CardContent>
                    </Card>
                    <Card className="sm:col-span-2 md:col-span-3">
                        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                           <Smile className="w-12 h-12 text-yellow-500 flex-shrink-0" />
                           <div>
                              <h3 className="font-semibold text-lg">Boost confidence</h3>
                              <p className="text-sm">Accessorize smarter and feel confident knowing all your style choices are made with awareness and are uniquely you.</p>
                           </div>
                        </CardContent>
                    </Card>
                 </div>
              </section>

              {/* How the AI Works */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Step-by-Step: How the AI Face Shape Detector Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><b>Face Detection:</b> AI identifies your face boundaries and key landmarks such as forehead, cheekbones, jawline, and chin.</li>
                        <li><b>Feature Mapping:</b> It measures distances and ratios between facial points.</li>
                        <li><b>Shape Matching:</b> The system compares your data with a shape model which has been trained on thousands of real faces.</li>
                        <li><b>Instant Result:</b> Your face shape appears with a visual overlay and styling advice.</li>
                    </ol>
                    <p className="!mt-4 pt-4 border-t">All processing happens in real time, and your photo is deleted immediately after analysis.</p>
                  </CardContent>
                </Card>
              </section>

            </div>

            <FAQSection faqs={faqs} />
            <p className="text-sm text-muted-foreground text-center mt-12">
              Curious about other health metrics? Check out our{" "}
              <Link href="/health/absi-calculator" className="text-primary hover:underline">
                ABSI Calculator
              </Link> to understand your body shape risk.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}