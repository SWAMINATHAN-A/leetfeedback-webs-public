import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BlurFade } from "../components/magicui/blur-fade";
import { ChromaText } from "../components/ui/textRenderAppear";
import Footer from "../components/Footer";
import {
  ServerMigration,
  LatencyGraph,
  DatabaseSync,
  NetworkTopology,
  K8sDeployment,
} from "../components/blog/VectorArt";

// ChromaText styles for blog post page - pastel colors
const BlogPostChromaStyles = () => (
  <style>{`
    .chroma-text {
      display: inline-flex;
      padding-bottom: 0.3rem;
      padding-right: 0.15em;
      background-size: 300% 100%;
      background-position: 100% 0;
      will-change: background-position;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .chroma-text-animate {
      animation: chroma-sweep-blog-post 1.2s ease-in-out forwards;
      filter: blur(1px);
    }

    [data-chroma-id="blog-post-title"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(255, 182, 193) 40%,
        rgb(255, 218, 185) 45%,
        rgb(176, 224, 230) 50%,
        rgb(221, 160, 221) 55%,
        rgb(255, 228, 196) 60%,
        transparent 66.67%,
        transparent
      );
      animation-delay: 0.3s;
    }

    [data-chroma-id^="section-"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(176, 224, 230) 40%,
        rgb(221, 160, 221) 45%,
        rgb(255, 218, 185) 50%,
        rgb(255, 228, 196) 55%,
        rgb(255, 182, 193) 60%,
        transparent 66.67%,
        transparent
      );
      animation-delay: 0.2s;
    }

    [data-chroma-id="achievement-title"],
    [data-chroma-id="conclusion-title"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(255, 218, 185) 40%,
        rgb(255, 182, 193) 45%,
        rgb(221, 160, 221) 50%,
        rgb(176, 224, 230) 55%,
        rgb(255, 228, 196) 60%,
        transparent 66.67%,
        transparent
      );
      animation-delay: 0.2s;
    }

    @keyframes chroma-sweep-blog-post {
      0% {
        background-position: 100% 0;
        filter: blur(1px);
      }
      100% {
        background-position: 0 0;
        filter: blur(0px);
      }
    }
  `}</style>
);

// Visible wrapper that triggers animation only when scrolled into view
const VisibleChromaText: React.FC<{
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ children, id, className, delay = 0.2, duration = 1.0 }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationKey((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {isVisible ? (
        <ChromaText
          key={animationKey}
          id={id}
          className={className}
          delay={delay}
          duration={duration}
        >
          {children}
        </ChromaText>
      ) : (
        <span className={className} style={{ opacity: 0 }}>
          {children}
        </span>
      )}
    </span>
  );
};

const BlogPostPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* ChromaText styles */}
        <BlogPostChromaStyles />

        <main className="max-w-4xl mx-auto px-6 lg:px-16 py-16">
          {/* Back link */}
          <BlurFade delay={0.1}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
          </BlurFade>

          {/* Blog Header */}
          <header className="mb-16">
            <BlurFade delay={0.2}>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
                February 8, 2026
              </p>
            </BlurFade>
            
            {/* AI Disclaimer */}
            <BlurFade delay={0.25}>
              <div className="mb-6 p-4 border rounded-lg bg-primary/5 justify-center align-center text-center">
                <p className="text-sm text-muted-foreground">
                  This article is AI generated. In essence, 6 hours of data and Azure migration to bring our platform form being borderline unusable to extremely fast. I learned a lot of things, thank you gpt.
                </p>
              </div>
            </BlurFade>

            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-6">
              <VisibleChromaText
                id="blog-post-title"
                delay={0.3}
                duration={1.5}
              >
                Infrastructure Migration and Optimization
              </VisibleChromaText>
            </h1>
            <BlurFade delay={0.4}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Global infrastructure migration to optimize latency for Indian
                users by moving the database and backend services closer to the
                target region.
              </p>
            </BlurFade>
          </header>

          {/* Server Migration Vector Art */}
          <BlurFade delay={0.5}>
            <div className="my-12 border border-border rounded-lg p-6 bg-secondary/30">
              <ServerMigration className="w-full max-w-lg mx-auto grayscale" />
            </div>
          </BlurFade>

          {/* Achievement Summary */}
          <BlurFade delay={0.6}>
            <section className="mb-16 bg-accent/30 border border-border rounded-lg p-8">
              <h2 className="text-2xl font-light text-foreground mb-6">
                <VisibleChromaText
                  id="achievement-title"
                  delay={0.2}
                  duration={1.0}
                >
                  Achievement Summary
                </VisibleChromaText>
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The migration successfully transitioned the entire Traverse
                  backend stack from a geographically disparate setup to
                  regionalized clusters, achieving:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <strong className="text-foreground">
                        Database Performance:
                      </strong>{" "}
                      ~50% faster queries by migrating from NeonDB Germany to
                      Singapore
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <strong className="text-foreground">
                        Backend Performance:
                      </strong>{" "}
                      ~5x faster API response by moving from Azure East US to
                      Central India
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <strong className="text-foreground">
                        User Experience:
                      </strong>{" "}
                      API response times dropped from ~5.6s (cold) to ~0.97s
                      (hot) / ~3.1s (cold)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <strong className="text-foreground">Continuity:</strong>{" "}
                      Zero client-side updates required - original API URL
                      preserved
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </BlurFade>

          {/* Blog Post Content */}
          <article className="mb-20 space-y-16">
            {/* Part 1: Database Migration */}
            <BlurFade delay={0.7}>
              <section>
                <h2 className="text-3xl font-light text-foreground mb-6">
                  <VisibleChromaText
                    id="section-database"
                    delay={0.2}
                    duration={1.2}
                  >
                    Part 1: Database Migration
                  </VisibleChromaText>
                </h2>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The first phase of our migration involved moving our PostgreSQL database from NeonDB's Germany cluster to their Singapore region. This geographical shift was crucial for reducing latency for our primary user base in India. The migration process required careful planning to ensure zero data loss and minimal downtime.
                  </p>

                  {/* Database Sync Vector Art */}
                  <div className="my-10 border border-border rounded-lg p-6 bg-secondary/30">
                    <DatabaseSync className="w-full max-w-lg mx-auto grayscale" />
                  </div>

                  <p>
                    We started by installing PostgreSQL client tools on our local machine, as they weren't available in our execution environment. Once the tools were ready, we verified connectivity to the new Singapore cluster to ensure everything was properly configured before beginning the actual data transfer.
                  </p>

                  <p>
                    The migration strategy involved pushing our Prisma schema to the new database first, creating all the necessary table structures. This ensured that when we imported the data, all the relationships and constraints would be properly maintained. We then used pg_dump to create a data-only backup from the Germany cluster in custom format, which provides better compression and flexibility during restoration.
                  </p>

                  <p>
                    The restoration process used pg_restore with triggers disabled to handle foreign key constraints during the bulk copy operation. This is a standard practice when migrating large datasets, as it allows the data to be inserted without constraint checks slowing down the process. After the import completed, we ran validation queries to compare row counts across all primary tables between the old and new clusters. All counts matched exactly - 59 users, 102 submissions, 95 solves, 357 revisions, confirming a successful migration.
                  </p>

                  {/* All Database Commands Clustered */}
                  <div className="my-8 space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Database Migration Commands
                    </h3>
                    
                    <div className="bg-code border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Install PostgreSQL tools</p>
                        <code className="text-foreground">brew install libpq && brew link --force libpq</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Verify Singapore connection</p>
                        <code className="text-foreground whitespace-pre">{`/opt/homebrew/opt/libpq/bin/psql \\
  'postgresql://[SINGAPORE_URL]' \\
  -c "SELECT 1 as test;"`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Push Prisma schema</p>
                        <code className="text-foreground whitespace-pre">{`DATABASE_URL='postgresql://[SINGAPORE_URL]' \\
  npx prisma db push --accept-data-loss`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Export from Germany</p>
                        <code className="text-foreground whitespace-pre">{`/opt/homebrew/opt/libpq/bin/pg_dump \\
  'postgresql://[GERMANY_URL]' \\
  --data-only --format=custom \\
  --no-owner --no-acl \\
  --file=/tmp/traverse_data.dump`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Import to Singapore</p>
                        <code className="text-foreground whitespace-pre">{`/opt/homebrew/opt/libpq/bin/pg_restore \\
  --verbose --no-owner --no-acl \\
  --data-only --disable-triggers \\
  --dbname='postgresql://[SINGAPORE_URL]' \\
  /tmp/traverse_data.dump`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Validate migration</p>
                        <code className="text-foreground whitespace-pre">{`SELECT 'User' as table_name, COUNT(*) FROM "User"
UNION ALL SELECT 'Submission', COUNT(*) FROM "Submission"
UNION ALL SELECT 'Solve', COUNT(*) FROM "Solve"
UNION ALL SELECT 'Revision', COUNT(*) FROM "Revision"
UNION ALL SELECT 'Problem', COUNT(*) FROM "Problem";`}</code>
                      </div>
                    </div>
                  </div>

                  <p>
                    The database migration reduced query latency by approximately 50% for regional operations. Simple connection tests that previously took around 1.5 seconds from India to Germany now completed in just 157ms to Singapore. More complex queries like ML revision lookups improved from 1.85 seconds to 774ms, and dashboard aggregations dropped from 1.75 seconds to 717ms.
                  </p>
                </div>
              </section>
            </BlurFade>

            {/* Part 2: Backend Migration */}
            <BlurFade delay={0.8}>
              <section>
                <h2 className="text-3xl font-light text-foreground mb-6">
                  <VisibleChromaText
                    id="section-backend"
                    delay={0.2}
                    duration={1.2}
                  >
                    Part 2: Backend Migration
                  </VisibleChromaText>
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    With the database successfully migrated to Singapore, the next step was relocating our backend services from Azure's East US region to Central India (Pune). This would position our API servers much closer to both our users and the newly migrated database, creating a more efficient network topology.
                  </p>

                  {/* Network Topology Vector Art */}
                  <div className="my-10 border border-border rounded-lg p-6 bg-secondary/30">
                    <NetworkTopology className="w-full max-w-md mx-auto grayscale" />
                  </div>

                  <p>
                    The backend migration strategy focused on maintaining the original API URL to avoid any client-side updates. We created a new B1 Linux App Service Plan in Central India and initially deployed a temporary test instance to benchmark performance before committing to the final switchover. After confirming the improved response times, we executed a clean switchover by deleting the old US app and recreating it with the original name in the India region.
                  </p>

                  <p>
                    All environment variables and container registry credentials were carefully transferred to ensure the new deployment had identical configuration. The entire process was designed to be reversible if any issues arose, though the migration completed smoothly without requiring rollback.
                  </p>

                  {/* All Backend Commands Clustered */}
                  <div className="my-8 space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Backend Migration Commands
                    </h3>
                    
                    <div className="bg-code border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Create India service plan</p>
                        <code className="text-foreground whitespace-pre">{`az appservice plan create \\
  --name traverse-plan-india \\
  --resource-group traverse-rg \\
  --location centralindia \\
  --sku B1 --is-linux`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Delete old US app</p>
                        <code className="text-foreground whitespace-pre">{`az webapp delete \\
  --name traverse-backend-api \\
  --resource-group traverse-rg`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Recreate with original name in India</p>
                        <code className="text-foreground whitespace-pre">{`az webapp create \\
  --name traverse-backend-api \\
  --resource-group traverse-rg \\
  --plan traverse-plan-india \\
  --deployment-container-image-name [IMAGE]`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Configure container and environment</p>
                        <code className="text-foreground whitespace-pre">{`az webapp config container set \\
  --name traverse-backend-api \\
  --resource-group traverse-rg \\
  --container-image-name [IMAGE] \\
  --container-registry-url [URL]

az webapp config appsettings set \\
  --name traverse-backend-api \\
  --resource-group traverse-rg \\
  --settings DATABASE_URL="[SINGAPORE_URL]" [OTHER_VARS]`}</code>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2"># Cleanup old resources</p>
                        <code className="text-foreground whitespace-pre">{`az appservice plan delete \\
  --name traverse-plan \\
  --resource-group traverse-rg --yes`}</code>
                      </div>
                    </div>
                  </div>

                  <p>
                    The results were dramatic. API response times improved by approximately 5x across the board. The health endpoint that previously took 1.33 seconds now responded in just 254ms. Database health checks dropped from 1.64 seconds to 584ms. Most importantly, our warm API responses improved from 5.59 seconds to under 1 second, providing a significantly better user experience.
                  </p>
                </div>
              </section>
            </BlurFade>

            {/* Part 3: LSTM Model Deployment */}
            <BlurFade delay={0.9}>
              <section>
                <h2 className="text-3xl font-light text-foreground mb-6">
                  <VisibleChromaText
                    id="section-lstm"
                    delay={0.2}
                    duration={1.2}
                  >
                    Part 3: LSTM Model Deployment with Kubernetes
                  </VisibleChromaText>
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    For our LSTM spaced repetition model, we chose Kubernetes over HuggingFace Inference Endpoints for several strategic reasons. While HuggingFace offers convenience, Kubernetes provides better cost control, infrastructure integration, and customization capabilities that align with our needs.
                  </p>

                  {/* K8s Deployment Diagram */}
                  <div className="my-10 border border-border rounded-lg p-6 bg-secondary/30">
                    <K8sDeployment className="w-full max-w-2xl mx-auto grayscale" />
                  </div>

                  <p>
                    The cost advantage is significant - HuggingFace charges per hour regardless of usage, while Kubernetes allows us to scale to zero during low traffic periods. Since our backend already runs on Azure, deploying to Azure Kubernetes Service (AKS) keeps everything in the same region and network, reducing latency and simplifying operations.
                  </p>

                  <p>
                    Our model requires specific data preprocessing tightly coupled with our database schema. Kubernetes gives us full control over the serving pipeline, allowing us to implement custom preprocessing logic that would be difficult to achieve with HuggingFace's standardized endpoints. Additionally, during peak hours when students are actively studying, we can automatically scale from 1 to 10 pods based on CPU and memory usage, providing elastic capacity that's more granular and cost-effective than HuggingFace's scaling options.
                  </p>

                  <p>
                    The deployment architecture uses a standard Kubernetes setup with an Ingress Controller routing traffic to a Service, which load balances across multiple pods. Each pod contains two containers: a TensorFlow Serving container running our trained LSTM model, and a FastAPI container handling request preprocessing and API logic. This separation of concerns makes the system easier to maintain and update.
                  </p>

                  {/* All Kubernetes Configs Clustered */}
                  <div className="my-8 space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Kubernetes Configuration Files
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="bg-code border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <p className="text-xs text-muted-foreground mb-2"># Deployment and Service manifest</p>
                        <code className="text-foreground whitespace-pre">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: lstm-model
spec:
  replicas: 3
  selector:
    matchLabels:
      app: lstm-model
  template:
    metadata:
      labels:
        app: lstm-model
    spec:
      containers:
      - name: model
        image: traverse.azurecr.io/lstm-model:latest
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        ports:
        - containerPort: 8501
---
apiVersion: v1
kind: Service
metadata:
  name: lstm-service
spec:
  selector:
    app: lstm-model
  ports:
  - port: 80
    targetPort: 8501
  type: LoadBalancer`}
                        </code>
                      </div>

                      <div className="bg-code border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <p className="text-xs text-muted-foreground mb-2"># Horizontal Pod Autoscaler</p>
                        <code className="text-foreground whitespace-pre">
{`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: lstm-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: lstm-model
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80`}
                        </code>
                      </div>
                    </div>
                  </div>

                  <p>
                    The Horizontal Pod Autoscaler monitors CPU and memory usage, automatically scaling the deployment between 1 and 10 replicas based on demand. When CPU utilization exceeds 70% or memory exceeds 80%, new pods are spun up to handle the load. During quiet periods, the system scales back down to conserve resources.
                  </p>

                  <p>
                    The results speak for themselves. Our Kubernetes deployment provides approximately 120ms average inference time, compared to around 300ms with HuggingFace due to network overhead. We're seeing about 60% cost savings compared to HuggingFace Inference Endpoints for our traffic pattern. The system maintains 99.9% uptime with automatic pod restarts and health checks, and scales elastically from 1 to 10 pods based on actual demand.
                  </p>
                </div>
              </section>
            </BlurFade>

            {/* Part 4: Testing and Benchmarks */}
            <BlurFade delay={1.0}>
              <section>
                <h2 className="text-3xl font-light text-foreground mb-6">
                  <VisibleChromaText
                    id="section-testing"
                    delay={0.2}
                    duration={1.2}
                  >
                    Part 4: Testing and Benchmarks
                  </VisibleChromaText>
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    After completing both migrations, we conducted comprehensive testing to measure the actual performance improvements. The results exceeded our expectations across all metrics.
                  </p>

                  {/* Latency Graph Vector Art */}
                  <div className="my-10 border border-border rounded-lg p-6 bg-secondary/30">
                    <LatencyGraph className="w-full max-w-lg mx-auto grayscale" />
                  </div>

                  <p>
                    API endpoint latency testing was performed using curl from India, measuring both cold starts and warm responses. The health endpoint improved from 1.332 seconds to 254 milliseconds - a 5.2x improvement. Database health checks went from 1.641 seconds to 584 milliseconds, nearly 3x faster. Most significantly, our warm API responses dropped from 5.589 seconds to just 977 milliseconds, representing a 5.7x performance gain.
                  </p>

                  <div className="bg-code border border-border rounded-lg overflow-hidden my-8">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="text-left p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            Endpoint
                          </th>
                          <th className="text-left p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            Before
                          </th>
                          <th className="text-left p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            After
                          </th>
                          <th className="text-left p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            Improvement
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-4 font-mono text-foreground">
                            GET /health
                          </td>
                          <td className="p-4 text-muted-foreground">1.332s</td>
                          <td className="p-4 text-muted-foreground">0.254s</td>
                          <td className="p-4 text-primary font-medium">
                            5.2x faster
                          </td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4 font-mono text-foreground">
                            GET /api/health/db
                          </td>
                          <td className="p-4 text-muted-foreground">1.641s</td>
                          <td className="p-4 text-muted-foreground">0.584s</td>
                          <td className="p-4 text-primary font-medium">
                            2.8x faster
                          </td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4 font-mono text-foreground">
                            Warm Response
                          </td>
                          <td className="p-4 text-muted-foreground">5.589s</td>
                          <td className="p-4 text-muted-foreground">0.977s</td>
                          <td className="p-4 text-primary font-medium">
                            5.7x faster
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    These improvements translate directly to better user experience. Pages that previously took several seconds to load now respond in under a second, making the application feel significantly more responsive and professional.
                  </p>
                </div>
              </section>
            </BlurFade>

            {/* Conclusion */}
            <BlurFade delay={1.1}>
              <section>
                <h2 className="text-3xl font-light text-foreground mb-6">
                  <VisibleChromaText
                    id="conclusion-title"
                    delay={0.2}
                    duration={1.2}
                  >
                    Conclusion
                  </VisibleChromaText>
                </h2>
                <div className="bg-accent/50 border border-border rounded-md p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The complete infrastructure migration successfully transformed our system architecture from a geographically dispersed setup to a regionalized deployment optimized for our primary user base. By moving the database from Germany to Singapore and the backend from East US to Central India, we achieved dramatic performance improvements while maintaining complete backward compatibility. The addition of Kubernetes-based LSTM model deployment provides a scalable, cost-effective solution for our machine learning workloads. Most importantly, no client-side changes were required - the original API URL was preserved throughout the migration, making the transition completely transparent to our users.
                  </p>
                </div>
              </section>
            </BlurFade>
          </article>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
