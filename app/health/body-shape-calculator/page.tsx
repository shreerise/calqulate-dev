import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import BodyShapeCalculator from "@/components/calculators/body-shape-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Ruler, HeartPulse, UserCheck, Shield, BookOpen, Sparkles, Dumbbell, Shirt } from "lucide-react";

export const metadata: Metadata = {
  title: "Body Shape Calculator: What is My Body Shape?",
  description: "Uncover your true body shape with our calculator. Learn what it means for style, fitness, and health, whether you're an hourglass, pear, apple, or rectangle.",
  keywords: "body shape calculator, what is my body shape, body type calculator, female body shape calculator, find your body type, body measurement simulator, calqulate.net",
};

const faqs = [
    { question: "1. How do I use this calculator to find out my body shape?", answer: "Simply input your bust, waist, and hip measurements into our Body Shape Calculator to find your body shape. It instantly analyzes your proportions and classifies your body as hourglass, pear, apple, rectangle, or inverted triangle. It's the easiest and most accurate way to answer \"What is my body shape?\" without guesswork." },
    { question: "2. What are the measurements required for the body shape type calculator?", answer: "You will need your bust, waist, and hip measurements. If you want more detailed results, you can also add your shoulder or high hip measurements. Our female body shape calculator allows both inches and centimeters, so you can use any unit you like." },
    { question: "3. Can men use this body shape calculator too?", answer: "Yes! Though it's designed primarily as a female body shape calculator, men can also use it to identify their body type and understand fat distribution. This helps in choosing the right workouts, clothes, and diet plans suited to men's body types." },
    { question: "4. What is the difference between body type and body shape?", answer: "\"Body type\" typically refers to your body build, or somatotype-ectomorph, mesomorph, or endomorph-describing the way your body is genetically predisposed to store fat and build muscle. “Body shape” is all about your visible proportions, such as hourglass or pear. Our body type calculator and body shape calculator 3D put both concepts together to provide you with a fuller understanding of your body." },
    { question: "5. How accurate is the body shape calculator?", answer: "Our Body Calculator Shape uses scientifically validated measurement ratios to calculate your shape. Accuracy depends on correct measurements — keep the tape snug, not tight, and measure over light clothing or directly on the body. Results are educational, not diagnostic, but very reliable for fashion, fitness, and wellness guidance." },
    { question: "6. What can I do once I know my body shape?", answer: "When you find your shape using our what body shape am I calculator, you can: CHOOSE CLOTHES THAT FLATTER YOUR PROPORTIONS. Create a fitness routine tailored to your body type. Understand where your body stores fat or muscle. Boost your confidence and self-awareness. This knowledge helps you look and feel your best — inside and out." },
    { question: "7. Does my body shape change over time?", answer: "Yes, your body shape can change due to factors like aging, hormones, weight gain/loss, or pregnancy. For instance, a pear shape may turn into an apple shape when one's metabolism slows down. Regular use of our what is your body shape calculator helps you track changes and adapt your fitness and nutrition plans accordingly." }
];

// Reusable Vertical Stepper Component from ABSI page
const VerticalStepper = ({ steps }: { steps: { title: string; description: string }[] }) => {
  return (
    <div className="relative pl-8">
      {steps.map((step, index) => (
        <div key={index} className={`relative ${index < steps.length - 1 ? 'pb-10' : 'pb-0'}`}>
          {index < steps.length - 1 && <div className="absolute top-2 left-[1px] w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>}
          <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"></div>
          <div className="pl-6">
            <h3 className="text-lg font-semibold text-primary">Step {String(index + 1).padStart(2, '0')}</h3>
            <p className="font-bold mt-1">{step.title}</p>
            <p className="text-muted-foreground mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default function BodyShapeCalculatorPage() {
    const measurementSteps = [
        { title: "Bust Measurement", description: "Standing straight, measure around the fullest part of the bust with the tape. Keep the tape snug but not tight." },
        { title: "Waist Measurement", description: "Find your natural waist, usually the narrowest part above your belly button. Measure around it." },
        { title: "Hip Measurement", description: "Stand with your feet together. Measure around the widest part of your hips and buttocks." },
        { title: "Shoulders or High Hip", description: "For more accurate results, include your shoulder or high-hip measurement in the calculator above." },
    ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Body Shape Calculator"
        description="Uncover your true body shape and what it means for both style, fitness, and health."
        url="https://calqulate.net/health/body-shape-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Body Shape Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
                Uncover your true body shape and what it means for both style, fitness, and health. Our calculator uses your measurements to determine if you're an hourglass, pear, apple, rectangle, or inverted triangle and gives you a personalized understanding of your proportions.
              </p>
            </div>

            <BodyShapeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              <section> 
                <h2><b>What is a body shape calculator?</b></h2>
                <p>A body shape calculator, also known as a body type calculator, helps you determine your natural silhouette based on bust, waist, and hip measurements. This free online calculator analyzes your proportions to figure out which category your body type falls into—so you can make the right decisions for fashion, fitness, and health.</p>
                <blockquote>Our calculator is not only visual but also scientific, using a ratio-driven algorithm inspired by modern anthropometric research to achieve precise classification of your shape.</blockquote>
                <p>Ideal for both women and men, but especially helpful as a female body shape calculator for styling, wellness, and self-confidence.</p>
              </section>

              <section>
                <h2><b>Why Knowing Your Body Shape Matters</b></h2>
                <p>Your body shape is more than just appearance; it's a blueprint to your health, confidence, and lifestyle. Here's what you can find out by using our calculator:</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose mt-6">
                  {[
                    { title: "Understand Proportions", icon: <UserCheck className="w-6 h-6 text-blue-500" />, text: "Learn how your body stores fat and muscle." },
                    { title: "Enhance Your Style", icon: <Shirt className="w-6 h-6 text-pink-500" />, text: "Learn which fashion styles best suit your body shape." },
                    { title: "Tailor Your Fitness", icon: <Dumbbell className="w-6 h-6 text-green-500" />, text: "Identify fitness routines that suit your body proportions." },
                    { title: "Identify Health Risks", icon: <HeartPulse className="w-6 h-6 text-red-500" />, text: "Learn about potential health risks associated with fat distribution." },
                    { title: "Build Confidence", icon: <Sparkles className="w-6 h-6 text-yellow-500" />, text: "Build self-acceptance through a better understanding of yourself." },
                  ].map(item => (
                    <Card key={item.title}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">{item.title}</CardTitle>{item.icon}</CardHeader>
                      <CardContent><p className="text-xs text-muted-foreground">{item.text}</p></CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                  <h2><b>Female Body Shape Measurement Chart</b></h2>
                  <Card className="not-prose"><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
                      <thead><tr><th>Body Shape Type</th><th>Bust (in/cm)</th><th>Waist (in/cm)</th><th>Hips (in/cm)</th><th>Characteristics</th></tr></thead>
                      <tbody>
                        <tr className="border-t"><td>Hourglass</td><td>36–40 (91–102)</td><td>24–28 (61–71)</td><td>36–40 (91–102)</td><td>Balanced bust and hips with a defined narrow waist.</td></tr>
                        <tr className="border-t bg-muted/50"><td>Top Hourglass</td><td>38–42 (96–107)</td><td>26–30 (66–76)</td><td>36–40 (91–102)</td><td>Bust slightly larger than hips, waist well-defined.</td></tr>
                        <tr className="border-t"><td>Bottom Hourglass</td><td>36–38 (91–96)</td><td>25–28 (63–71)</td><td>38–42 (96–107)</td><td>Hips slightly larger than bust, with hourglass proportions.</td></tr>
                        <tr className="border-t bg-muted/50"><td>Pear (Triangle)</td><td>32–36 (81–91)</td><td>26–30 (66–76)</td><td>38–44 (96–112)</td><td>Wider hips than bust; fat stored around hips/thighs.</td></tr>
                        <tr className="border-t"><td>Apple (Round)</td><td>38–44 (96–112)</td><td>32–38 (81–96)</td><td>36–40 (91–102)</td><td>Fuller bust and midsection, narrower hips.</td></tr>
                        <tr className="border-t bg-muted/50"><td>Inverted Triangle</td><td>38–44 (96–112)</td><td>28–32 (71–81)</td><td>34–38 (86–96)</td><td>Broader shoulders and bust with slimmer hips.</td></tr>
                        <tr className="border-t"><td>Rectangle</td><td>34–38 (86–96)</td><td>27–31 (69–79)</td><td>34–38 (86–96)</td><td>Similar bust, waist, and hip measurements.</td></tr>
                        <tr className="border-t bg-muted/50"><td>Spoon</td><td>34–38 (86–96)</td><td>26–30 (66–76)</td><td>40–46 (102–117)</td><td>Hips much larger than bust, with a shelf-like appearance.</td></tr>
                      </tbody>
                  </table></div></CardContent></Card>
                  <div className="grid md:grid-cols-2 gap-4 mt-6 not-prose">
                      <Card>
                        <CardHeader><CardTitle className="text-base flex items-center gap-2"><BookOpen className="w-4 h-4" /> How to Interpret This Chart</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground mb-2">Focus on ratios, not just size. For example:</p>
                          <ul className="text-sm space-y-1">
                            <li><strong>Hourglass:</strong> hips ≈ bust, waist 8–10 in smaller.</li>
                            <li><strong>Pear:</strong> hips &gt; bust by 3–5 in.</li>
                            <li><strong>Apple:</strong> waist ≈ bust, hips smaller.</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shirt className="w-4 h-4" /> U.S. Dress Size Conversion</CardTitle></CardHeader>
                        <CardContent><div className="overflow-x-auto"><table className="w-full text-sm">
                          <thead><tr><th>Size</th><th>Bust (in)</th><th>Waist (in)</th><th>Hips (in)</th></tr></thead>
                          <tbody>
                            <tr><td>XS (2–4)</td><td>30–32</td><td>20–22</td><td>30–32</td></tr>
                            <tr className="bg-muted/50"><td>S (6–8)</td><td>32–34</td><td>22–25</td><td>32–35</td></tr>
                            <tr><td>M (10–12)</td><td>36–38</td><td>26–29</td><td>36–39</td></tr>
                          </tbody>
                        </table></div></CardContent>
                      </Card>
                  </div>
              </section>
              
              <section>
                  <h2><b>How to Determine Your Body Type</b></h2>
                  <div className="grid md:grid-cols-2 gap-8 items-center not-prose">
                      <VerticalStepper steps={measurementSteps} />
                      <Card>
                          <CardHeader><CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5"/> Taking Measurements</CardTitle></CardHeader>
                          <CardContent>
                              <p>No professional fitting sessions are required, just a soft tape measure and 2 minutes of your time.</p>
                              <p className="mt-2 text-muted-foreground text-sm">Click "Calculate" above when you're done, and our body calculator shape tool will let you know what your body type is.</p>
                          </CardContent>
                      </Card>
                  </div>
              </section>

              <section>
                <h2><b>What Your Body Shape Can Reveal About Health</b></h2>
                <p>Body shape is not just about your looks; it can tell you where your body tends to store fat and which areas may require extra care.</p>
                <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
                    <Card className="border-l-4 border-red-500">
                        <CardHeader><CardTitle className="text-lg">Apple Shape Risks</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Storing fat centrally can lead to a higher risk for cardiovascular concerns.</p></CardContent>
                    </Card>
                    <Card className="border-l-4 border-green-500">
                        <CardHeader><CardTitle className="text-lg">Pear Shape Risks</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Carries less metabolic risk but may deal with hip and knee joint strain from a wider lower body.</p></CardContent>
                    </Card>
                </div>
                <blockquote className="mt-6">Remember, no body type is "better" than another; every shape is normal and beautiful. The key is learning how to take care of your unique structure with the right diet, exercise, and lifestyle.</blockquote>
              </section>
              
              <section>
                  <Card className="not-prose border-l-4 border-yellow-500 bg-yellow-500/5">
                      <CardHeader><CardTitle>Disclaimer</CardTitle></CardHeader>
                      <CardContent><p>This is a calculator for information and education purposes only, and should not be used as a diagnostic tool of health conditions. Personalized medical or fitness advice should be sought from a licensed professional.</p></CardContent>
                  </Card>
              </section>
            </div>
            
            <div className="mt-16">
                <h2><b>FAQs About Body Shape Calculator</b></h2>
                <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}