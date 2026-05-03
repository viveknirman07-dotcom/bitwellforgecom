import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";

export const articles = [
  {
    slug: "hire-for-capacity-or-build-a-system",
    title: "Hire for Capacity or Build a System. Knowing the Difference Matters.",
    excerpt: "Many founders hire to solve a problem that a system would solve more effectively and at a fraction of the cost.",
    category: "Growth Operations",
    date: "May 2026",
    content: `
Many founders hire to solve a problem that a system would solve more effectively and at a fraction of the cost.

**The Reflex to Hire**

When a business feels stretched, the instinct is often to add headcount. Someone is needed to handle the outreach. Someone is needed to manage the follow-ups. Someone is needed to produce the content. This instinct is understandable but often premature. Hiring into an unsystematised process does not solve the process problem. It creates a more expensive version of the same problem while adding management overhead that was not previously present.

**What a Systems Problem Looks Like**

A systems problem shows up as inconsistency. The outreach happens when there is time for it rather than on a defined schedule. The follow-up happens when it is remembered rather than when the sequence calls for it. The reporting happens quarterly rather than weekly. These are not capacity problems. They are process problems. Adding a person to a broken process produces a slightly less broken process with a higher payroll. Building the process first produces a scalable foundation that a hire can then maintain and improve.

**The Right Order of Operations**

Systematise first. Define the process clearly enough that it can be documented and repeated without the founder managing each step. Then assess whether the volume that the system can handle is sufficient or whether capacity is the genuine constraint. In most cases, systematising the acquisition process reveals that the business can handle more than it thought without adding headcount. When a hire does become necessary, the documented system means the new person can be productive immediately rather than spending months learning what should have been written down.
    `,
  },
  {
    slug: "consistency-in-outreach-is-the-strategy-most-businesses-skip",
    title: "Consistency in Outreach Is the Strategy Most Businesses Skip",
    excerpt: "A campaign produces a spike. A system produces a pipeline. The difference is consistency over time.",
    category: "Outbound",
    date: "May 2026",
    content: `
A campaign produces a spike. A system produces a pipeline. The difference is consistency over time.

**Why Sporadic Outreach Fails Even When the Messaging Is Strong**

Many founders run a cold email campaign, get modest results, and conclude that outreach does not work for their business. The conclusion is usually wrong. What did not work was the campaign format, not the channel. A campaign is a concentrated effort over a short period that produces a spike in activity and then stops. The pipeline spike requires either closing everything it generates or running another campaign. Most businesses cannot close everything in a single burst and most do not restart quickly enough to maintain pipeline continuity.

**The Mathematics of Consistent Outreach**

Consider the difference between sending 200 emails in one week versus sending 40 emails every week for five weeks. Both produce the same volume. The second approach produces contacts that enter the pipeline at different points in time, meaning follow-up conversations are spread across the period rather than compressed into one week. It also means the outreach is happening continuously, which means any given week has both new prospects entering and existing prospects being nurtured. The pipeline never empties completely between efforts.

**What a 90-Day Commitment Produces**

Ninety days of consistent outreach at a moderate daily volume, combined with structured follow-up, produces something that a single campaign cannot. It produces a pipeline in motion. Prospects at different stages of the decision process, conversations at different points of maturity, and data on what messaging performs best across different segments. By day 90, the outreach is informed by what the first 60 days taught, which means the final 30 days perform better than the first 30 did. That compounding improvement is only available to the business that commits to consistency rather than campaigns.
    `,
  },
  {
    slug: "the-follow-up-gap-is-where-most-deals-are-lost",
    title: "The Follow-Up Gap Is Where Most Deals Are Lost",
    excerpt: "The first conversation rarely closes the deal. What happens in the silence after it determines whether the revenue is won or lost.",
    category: "Sales Systems",
    date: "Apr 2026",
    content: `
The first conversation rarely closes the deal. What happens in the silence after it determines whether the revenue is won or lost.

**Where the Revenue Actually Goes**

Research on B2B sales consistently shows that the majority of closed deals require five or more follow-up touchpoints after the initial conversation. Most founders follow up once or twice before concluding the prospect is not interested. The prospect is often still interested. They are busy, distracted, or waiting for the right moment. The founder who disappears after one follow-up is not respecting the prospect's time. They are leaving revenue on the table because there is no system in place to maintain the conversation through the natural decision timeline.

**The Difference Between Following Up and Pestering**

Structured follow-up is not persistence for its own sake. Each touchpoint should carry a reason to re-engage. A useful piece of content, a relevant observation about their industry, a direct question about where they are in their decision process. The follow-up sequence should feel like continued service rather than repeated pressure. When it is structured this way, the prospect who was not ready in week one may be ready in week three and will respond to the touchpoint that arrives at the right moment rather than to the founder who gave up after the first attempt.

**Building the Follow-Up System**

A follow-up system is not complicated. It requires a defined sequence with specific timing, a template for each touchpoint that can be personalised quickly, and a tracking mechanism that shows which prospects are active and which need a next touch. The absence of this system is the follow-up gap. Closing it does not require a larger team or a more expensive tool. It requires the decision that consistent follow-up is part of the acquisition process rather than an optional extra.
    `,
  },
  {
    slug: "the-positioning-problem-most-service-businesses-ignore",
    title: "The Positioning Problem Most Service Businesses Ignore",
    excerpt: "When everyone sounds the same, price becomes the only differentiator. Most service businesses have a positioning problem long before they have a pipeline problem.",
    category: "Positioning",
    date: "Mar 2026",
    content: `
When everyone sounds the same, price becomes the only differentiator. Most service businesses have a positioning problem long before they have a pipeline problem.

**Why Vague Positioning Is an Acquisition Tax**

Every founder believes their service is different. Few can articulate how in a way that a prospective client would immediately understand and care about. The result is messaging that describes what you do rather than what changes for the client. Generic positioning forces prospects to compare on price because there is no other basis for comparison available to them. This is not a sales problem. It is a positioning problem that shows up as a sales problem.

**The Three Signs Your Positioning Is the Problem**

The first sign is that you consistently attract the wrong type of client. When positioning is unclear, enquiries come from people who are not a good fit and conversion conversations become difficult. The second sign is that you struggle to explain what you do in a single sentence without using industry jargon. If the explanation requires context or qualification, the positioning needs work. The third sign is that your pricing feels constantly under pressure. When a client cannot see a clear reason to choose you over an alternative, they will use price as the deciding factor regardless of how strong your delivery actually is.

**What Positioned Looks Like in Practice**

A positioned offer makes three things immediately clear. Who it is specifically for. What outcome it produces. Why that outcome is credible from this provider. The positioning does not need to be clever or provocative. It needs to be specific enough that the right person reads it and thinks this is for me, and the wrong person reads it and moves on. That self-selection is not a loss. It is the positioning working as designed. Clarity of fit is what enables consistent acquisition. Broad appeal is what creates inconsistent pipeline.
    `,
  },
  {
    slug: "outbound-and-inbound-are-not-competing-strategies",
    title: "Outbound and Inbound Are Not Competing Strategies",
    excerpt: "Choosing between outbound and inbound is a false decision. The businesses that build consistent pipeline combine both in the right sequence.",
    category: "Lead Generation",
    date: "Mar 2026",
    content: `
Choosing between outbound and inbound is a false decision. The businesses that build consistent pipeline combine both in the right sequence.

**The Sequencing Problem**

Most founders approach acquisition as a single channel decision. They either run outbound cold email campaigns or they invest in content and wait for inbound interest to compound. Both approaches work in isolation. Neither works as efficiently as when they operate together. The reason is timing. Outbound fills the immediate pipeline. Inbound builds the long term one. Treating them as alternatives means the business is always either chasing short term revenue or waiting for long term results, never doing both simultaneously.

**What Outbound Does That Inbound Cannot**

Outbound creates pipeline on demand. When a campaign is running, conversations are happening. When a founder needs revenue in the next 30 to 60 days, outbound is the mechanism that makes that possible. Content and inbound cannot produce that speed. They require months of consistent output before they generate meaningful inbound volume. Outbound is controllable, measurable, and fast. Those are not small advantages for a business that needs predictable revenue rather than variable organic results.

**What Inbound Does That Outbound Cannot**

Inbound creates authority that changes the quality of every conversation. When a prospect arrives having already consumed your content, the sales conversation starts from a position of established credibility. Objections are fewer. Trust is higher. Conversion is faster. Outbound can generate the conversation but it cannot replicate the standing that arrives with an inbound lead who chose to engage before being contacted. The combination produces better conversations at higher volume than either approach alone.
    `,
  },
  {
    slug: "why-growth-slows-even-when-effort-increases",
    title: "Why Growth Slows Even When Effort Increases",
    excerpt: "When more effort produces less momentum, the issue isn't energy. It's a structural ceiling that only architecture can break through.",
    category: "Strategy",
    date: "Feb 2026",
    content: `
Every scaling business encounters a paradox: the harder the team works, the slower growth becomes. This isn't a people problem. It's a systems problem.

In the early stages, effort and output are tightly linked. One person sends emails, another closes deals, and growth feels proportional to hustle. But as complexity increases, unstructured effort starts creating friction instead of momentum.

**The Structural Ceiling**

Growth slows because each new initiative adds weight to an already fragile system. Without a unifying architecture, every campaign, channel, and hire introduces coordination costs that silently erode output.

The symptoms are familiar: longer sales cycles, declining conversion rates, rising cost per acquisition, and a growing sense that "nothing is working like it used to."

**Effort vs. Architecture**

The distinction matters. Effort is finite and linear. Architecture is scalable and compounding. When a business relies on effort alone, it hits diminishing returns. When it invests in architecture, each new input amplifies existing systems.

Consider a sales team that doubles in size. Without process architecture, the new hires absorb more management time than they generate revenue. With architecture, onboarding is systematized, pipelines are structured, and output scales predictably.

**The Path Forward**

Breaking through a structural ceiling requires stepping back before pushing forward. Audit the existing growth infrastructure. Identify where effort is compensating for missing systems. Then design the architecture that makes growth proportional to investment again.

The businesses that scale successfully are not the ones that work hardest. They are the ones that build the best systems.
    `,
  },
  {
    slug: "the-hidden-cost-of-unstructured-acquisition",
    title: "The Hidden Cost of Unstructured Acquisition",
    excerpt: "The real expense isn't ad spend or headcount. It's the invisible tax of operating without a coherent acquisition system.",
    category: "Acquisition",
    date: "Jan 2026",
    content: `
Most businesses know what they spend on marketing. Few understand what unstructured acquisition actually costs them.

The visible costs are straightforward: ad budgets, salaries, tools, and agency fees. The hidden costs are far more damaging: wasted time on unqualified leads, duplicated effort across teams, inconsistent messaging that erodes trust, and opportunities lost to competitors with better systems.

**The Coordination Tax**

When acquisition isn't architected as a system, every team operates in isolation. Marketing generates leads that sales doesn't want. Sales creates messaging that contradicts marketing. Customer success inherits expectations that were never set properly.

This coordination tax compounds silently. It shows up as longer sales cycles, higher churn, and a persistent feeling that growth should be easier than it is.

**The Consistency Problem**

Unstructured acquisition produces inconsistent results. One month is strong, the next is weak. One channel performs, another stalls. Without a system connecting inputs to outputs, every quarter feels like starting over.

Consistency isn't about repeating the same tactics. It's about having a structural framework that produces reliable outcomes regardless of market conditions, personnel changes, or competitive shifts.

**Building the System**

Structured acquisition begins with clarity: who are the ideal clients, what problems do they face, and what is the most efficient path from awareness to commitment?

From there, every channel, message, and touchpoint is designed as a component of a larger system. Each piece reinforces the others. Nothing operates in isolation.

The result isn't just lower acquisition costs. It's predictable, compounding growth that improves with every cycle.
    `,
  },
  {
    slug: "clarity-before-scale",
    title: "Clarity Before Scale",
    excerpt: "Scaling without clarity is the most expensive mistake in B2B growth. Understanding what to build always precedes building it.",
    category: "Foundations",
    date: "Jan 2026",
    content: `
The urge to scale is natural. Revenue targets are pressing. Competitors are moving. The board wants growth. But scaling without clarity is like building a skyscraper on sand.

**What Clarity Means**

Clarity isn't a vague understanding of your market. It's precise, documented answers to fundamental questions:

Who exactly are the best fit clients? Not demographics, but psychographics, motivations, and decision making patterns.

What specific problem are you solving? Not features, but the transformation your clients experience.

What is the most efficient path from awareness to commitment? Not channels, but the complete journey and every decision point within it.

**Why Most Companies Skip It**

Clarity work feels slow. It doesn't produce immediate revenue. It requires honest assessment of assumptions that may have been operating unchallenged for years.

The pressure to "just start doing things" is immense. But every dollar spent scaling an unclear proposition is a dollar that could have been invested in the right foundation.

**The Compounding Effect**

When clarity precedes scale, something powerful happens: every subsequent investment performs better. Marketing resonates more deeply. Sales conversations are shorter and more productive. Client retention improves because expectations align with delivery.

Clarity doesn't slow growth. It makes growth sustainable. It's the difference between a business that grows in bursts and one that compounds consistently over years.

**The Practical Approach**

Start with a clarity audit. Document current assumptions about your market, positioning, and acquisition path. Test these assumptions against actual client data. Identify gaps between what you believe and what the evidence shows.

Then rebuild your growth strategy on verified foundations, not inherited assumptions.
    `,
  },
  {
    slug: "systems-vs-tactics-in-modern-b2b-growth",
    title: "Systems vs. Tactics in Modern B2B Growth",
    excerpt: "Tactics generate activity. Systems generate outcomes. Understanding the difference is the first step toward sustainable growth.",
    category: "Growth",
    date: "Dec 2025",
    content: `
The B2B growth landscape is saturated with tactics. New channels emerge monthly. Growth hacks circulate constantly. The promise is always the same: do this one thing and watch results pour in.

Tactics work. Briefly. Then they stop working, and the search for the next tactic begins. This cycle consumes enormous resources while producing diminishing returns.

**The Tactic Trap**

Tactics are solutions to symptoms. A company struggles with lead volume, so it tries a new channel. Conversion rates drop, so it redesigns landing pages. Churn increases, so it launches a retention campaign.

Each tactic addresses a surface level problem without examining the structural cause. The result is a growing collection of disconnected initiatives, none of which reinforce each other.

**What Systems Look Like**

A system is an interconnected set of processes designed to produce a specific outcome repeatedly. In growth, a system connects positioning, messaging, channels, conversion processes, and client experience into a cohesive whole.

When one component improves, the entire system improves. When the system encounters a challenge, the response is structural, not reactive.

**The Compounding Advantage**

Tactics degrade over time. They rely on novelty, arbitrage, or competitor ignorance, all of which are temporary. Systems improve over time. They learn, adapt, and compound.

A business running on tactics must constantly reinvent its growth approach. A business running on systems invests in optimization, not reinvention.

**Making the Shift**

Transitioning from tactics to systems requires a fundamental shift in thinking. Instead of asking "What should we try next?" the question becomes "What system would make our growth inevitable?"

The answer involves mapping the complete acquisition journey, identifying where structure is missing, and building the connective tissue between every growth component.
    `,
  },
  {
    slug: "why-most-funnels-fail-after-initial-success",
    title: "Why Most Funnels Fail After Initial Success",
    excerpt: "Early funnel success creates dangerous confidence. Understanding why funnels degrade reveals what sustainable acquisition actually requires.",
    category: "Sales Systems",
    date: "Nov 2025",
    content: `
A new funnel launches. Results are strong. The team celebrates. Then, slowly and predictably, performance declines. Costs per acquisition rise. Conversion rates fall. The funnel that seemed so promising becomes another underperforming asset.

This pattern repeats across industries, budgets, and team sizes. It's not a reflection of poor execution. It's a structural inevitability.

**Why Funnels Degrade**

Most funnels are built as static sequences: ad to landing page to email sequence to sales call. They perform well initially because they capture existing demand and benefit from novelty in their market.

But markets are dynamic. Competitors copy successful approaches. Audiences develop ad fatigue. The problem the funnel addresses evolves. Without a mechanism for adaptation, degradation is guaranteed.

**The Missing Layer**

What separates funnels that sustain from those that degrade is an intelligence layer: systematic feedback loops that connect output data to input decisions.

Which messages resonate with which segments? Where do qualified prospects disengage? What objections emerge at each stage? How does performance vary across channels, geographies, and time periods?

When these questions are answered continuously and fed back into the system, the funnel evolves with its market instead of falling behind it.

**Beyond the Funnel**

The deeper issue is that funnels represent a linear model of a non linear process. Buying decisions aren't sequential. Prospects research, compare, wait, revisit, consult, and decide on their own timeline.

Sustainable acquisition architecture accounts for this complexity. It creates multiple entry points, nurtures at different speeds, and adapts messaging to where each prospect actually is, not where the funnel assumes they should be.

**Building for Longevity**

Design acquisition systems, not funnels. Build in feedback mechanisms. Allow for non linear journeys. Optimize for learning speed, not just conversion rates.

The result is an acquisition engine that improves with every interaction, getting more efficient and more effective over time.
    `,
  },
  {
    slug: "sustainable-demand-creation-explained",
    title: "Sustainable Demand Creation Explained",
    excerpt: "Demand that depends on constant spending isn't demand. It's rented attention. True demand creation builds an asset that compounds.",
    category: "Demand",
    date: "Oct 2025",
    content: `
There are two approaches to generating demand. The first is to buy attention: run ads, sponsor content, pay for placement. Stop spending, and the attention stops.

The second is to build demand: create systems that generate awareness, trust, and intent as a byproduct of delivering genuine value. This approach compounds. It creates an asset, not an expense.

**The Rented Attention Problem**

Most B2B companies rely heavily on rented attention. Paid channels dominate the budget. Performance marketing teams optimize cost per click, cost per lead, and cost per acquisition.

The numbers look reasonable until someone asks: "What happens if you turn off the ads?" The answer is almost always: "Everything stops."

This isn't a growth strategy. It's a dependency.

**What Demand Creation Actually Means**

Sustainable demand creation builds three interconnected assets:

Authority: being recognized as the definitive source of insight in your domain. This comes from consistent, genuinely valuable thought leadership that helps your audience make better decisions regardless of whether they become clients.

Trust: demonstrating capability and integrity over time. This comes from public proof of expertise, transparent communication, and a track record of delivering on promises.

Intent: creating the natural desire to engage. This comes from positioning your solution as the obvious answer to a clearly defined problem that your audience already recognizes.

**The System Behind It**

Building these assets requires a system, not a campaign. Content must be architecturally designed: each piece serves a specific function in the broader demand creation engine.

Distribution must be systematic: reaching the right audiences through the right channels with the right frequency.

Measurement must be structural: tracking not just engagement metrics but actual pipeline impact and revenue attribution.

**The Compound Effect**

When demand creation is built as a system, something remarkable happens: each month's investment builds on the previous month's. Content accumulates authority. Distribution networks grow. Brand recognition deepens.

After 12 to 18 months, the system produces more demand than any paid channel, at a fraction of the ongoing cost. That's the difference between renting attention and owning demand.
    `,
  },
];

const Insights = () => {
  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-20">
            <ScrollReveal>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Insights</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-8 text-balance">
                Thinking on growth, systems, and strategic clarity.
              </h1>
            </ScrollReveal>
          </div>

          <div className="space-y-0">
            {articles.map((article, i) => (
              <ScrollReveal key={i} direction="right" delay={i * 100}>
                <Link to={`/insights/${article.slug}`}>
                  <article className="group border-t border-border py-10 md:py-14 cursor-pointer hover:-translate-y-1 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                      <div className="md:col-span-2">
                        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{article.category}</span>
                        <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                      </div>
                      <div className="md:col-span-7">
                        <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-3">
                          {article.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                      </div>
                      <div className="md:col-span-3 md:text-right">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          Read
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="Have a growth challenge?"
        subtext="Let's explore whether a structured approach could help."
        buttonLabel="Start a Conversation"
      />
    </div>
  );
};

export default Insights;
