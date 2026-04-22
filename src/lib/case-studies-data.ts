/**
 * Case Studies Dataset
 *
 * 14 entries. Each follows a 7-section narrative structure:
 *  1. Context     — who the client was, the moment we entered the work
 *  2. Diagnosis   — what was actually wrong beneath the surface symptoms
 *  3. Strategy    — the operating thesis we anchored the engagement on
 *  4. Build       — the systems, assets, and sequences we constructed
 *  5. Activation  — how the system went live and met the market
 *  6. Outcome     — what changed, measured against the starting line
 *  7. Reflection  — what the engagement reveals about the broader pattern
 *
 * Every entry is labeled as a Concept Study: the frameworks are real,
 * tested across multiple engagements, and the projected outcomes reflect
 * the structural design rather than a single named client.
 */

export interface CaseStudySection {
  heading: string;
  body: string[]; // paragraphs
}

export interface CaseStudy {
  id: string;
  category: "B2B Lead Generation" | "Revenue Systems" | "Growth Strategy" | "AI Automation & Systems";
  tag: string;
  title: string;
  subtitle: string;
  clientType: string;
  challenge: string;
  metrics: { label: string; value: string }[];
  sections: CaseStudySection[];
  result: string;
  label: string;
}

const CONCEPT_LABEL =
  "Concept Study: framework based on real system design, projected outcomes reflect tested methodology rather than a single named client engagement.";

export const caseStudies: CaseStudy[] = [
  // ============================================================
  // 01 — B2B LEAD GENERATION (full 3000w)
  // ============================================================
  {
    id: "b2b-lead-generation",
    category: "B2B Lead Generation",
    tag: "B2B Lead Generation",
    title: "From Invisible to Eleven Qualified Calls in Six Weeks",
    subtitle:
      "How an independent consulting practice built a predictable outreach engine without paid media, content marathons, or a sales hire.",
    clientType:
      "Independent business consultant, service based, B2B focused, mid five figure monthly revenue ceiling.",
    challenge:
      "No structured outreach. Revenue dependent on referrals that arrived in unpredictable waves. Months of strong cash flow followed by months of silence. No way to forecast, no way to scale, no way to step away from delivery without the pipeline going dark.",
    metrics: [
      { label: "Qualified discovery calls in 6 weeks", value: "11" },
      { label: "Conversion to retainer", value: "2" },
      { label: "New revenue secured", value: "≈ $9,400" },
      { label: "Outbound touches per day", value: "20" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "When this engagement began, the practitioner was already five years into independent consulting. The work was good. Clients renewed. Testimonials existed. A small but loyal network of past collaborators sent the occasional warm introduction. By every external measure, the business was working.",
          "Internally, the picture was different. Revenue moved in cycles that had nothing to do with effort and everything to do with luck. A retainer would end, a referral would arrive, a project would land, a quiet month would follow, and the cycle would restart. The owner spent the first hour of every Monday reviewing the bank balance and triangulating how many weeks of runway the current quarter held. That ritual had become exhausting.",
          "The catalyst for the engagement was not a crisis. It was a slow accumulation of evidence. Three referrals had failed to materialise in the prior quarter. Two larger prospects had gone cold after seemingly enthusiastic first meetings. A peer in an adjacent practice had quietly closed shop. The pattern was clear enough to confront. The business needed a way to generate qualified conversations on purpose, not by accident, and it needed it without taking on the cost or distraction of paid acquisition.",
          "That was the brief we accepted. Six weeks. No paid media. No content backlog to lean on. No existing list of warm prospects beyond the people already in the contacts file. Build a system that could put eleven qualified conversations on the calendar from a cold start, and leave behind something the owner could continue to operate without us.",
        ],
      },
      {
        heading: "Diagnosis",
        body: [
          "The first week of any engagement of this kind is spent looking past the stated problem. The owner described the issue as a lack of leads. That description was not wrong, but it was incomplete. Lack of leads is almost never the actual problem. It is the visible consequence of three deeper failures, and unless those are named, any outreach activity layered on top will produce the same boom and bust pattern as the referrals it is meant to replace.",
          "The first failure was positioning. The practice described itself as a consultancy that helped businesses grow. That sentence is technically accurate and operationally useless. It does not tell a prospect who the work is for, what specific outcome it produces, or why this practitioner rather than any other. When we audited the LinkedIn profile, the website headline, and the language used in past proposals, the through line was a generic competence rather than a sharp specificity. Generic competence does not earn a reply to a cold message. It earns a polite scroll.",
          "The second failure was target definition. When asked who the ideal client was, the answer included six different industries, three different company sizes, and four different problem categories. That is not a target market. That is an aspiration. A workable target list cannot be built from an aspiration because there is no way to filter, no way to score, no way to write a message that resonates with a specific human reading it on a Tuesday morning between meetings.",
          "The third failure was activity. There was no outreach happening. None. Not low volume outreach, not poorly executed outreach, simply none. The owner had convinced themselves that cold outreach was beneath the practice, that referrals were proof the work was strong enough to attract clients without solicitation. Both statements contained a kernel of truth and both had become a defence mechanism against the discomfort of asking strangers for their attention. The diagnosis we delivered was direct. The pipeline was empty because nothing was being put into it. The system did not need optimisation. It needed to exist.",
        ],
      },
      {
        heading: "Strategy",
        body: [
          "The strategic frame we anchored the engagement on had three parts, and they were sequenced deliberately. Positioning had to be rebuilt before any outreach went live, because outreach amplifies the clarity or confusion of the underlying message. A target had to be narrowed to a single defensible segment, because no six week build can serve six markets at once. And the activity itself had to be designed as a daily operating rhythm rather than a campaign, because a campaign ends and a rhythm compounds.",
          "On positioning, we collapsed the practice description from a paragraph of generalities to a single sentence that named the buyer, the outcome, and the mechanism. The exact wording is not what matters. What matters is that after the rewrite, anyone reading the LinkedIn headline could tell within four seconds whether they were the intended audience. That four second test became the standard we held every public asset against for the rest of the engagement.",
          "On targeting, we moved from six industries to one. The selection was not arbitrary. We looked at the past three years of closed work and asked which engagements had been the most profitable, the most enjoyable, and the most likely to generate a referral. One segment scored highest on all three axes. That became the target. Everyone else was deferred. This decision was emotionally difficult for the owner because it felt like turning away revenue. In practice, narrowing the target made every subsequent decision faster and every message sharper.",
          "On activity, we designed a rhythm rather than a sprint. Twenty outbound touches per working day, split between LinkedIn connection requests with a personalised note, second touch follow up messages on accepted connections, and a parallel three step cold email sequence to a list built from the same target definition. The number twenty was chosen because it was sustainable for a solo operator alongside delivery work, and because the maths supported it. At a realistic two percent qualified meeting rate, twenty touches per day across a five day week produces two qualified conversations per week, which over six weeks is twelve. The forecast of eleven was the conservative version of that arithmetic.",
        ],
      },
      {
        heading: "Build",
        body: [
          "The build phase ran for the first ten working days of the engagement. The deliverables were narrow on purpose. A rebuilt LinkedIn profile that passed the four second test. A target list of three hundred named accounts, each tagged with a primary contact and a verified email address. A connection request template with three personalisation variables. A two message follow up sequence for accepted connections. A three email cold sequence with a value first opener, a specific case reference in the second, and a soft pattern interrupt in the third. A simple tracking dashboard built in a spreadsheet, not a CRM, because the tool needed to be operable without a learning curve.",
          "Each asset was tested before it went live. The LinkedIn headline was shown to four people in the target segment with a single question attached. Tell me, in one sentence, what this person does. If the answer matched the intended positioning, the headline passed. Three out of four did, which we treated as a sufficient signal to proceed. The cold email opener was tested with a variant test on the first fifty sends, and the version that produced a reply rate above twelve percent became the standard.",
          "The tracking dashboard deserves a separate note because it is the part of the build that most operators skip and most regret skipping. The dashboard captured five fields per touch. Date sent, contact name, channel, response category, and next action. Response categories were limited to four. No reply, polite decline, soft interest, qualified meeting booked. That structure produced a weekly view of conversion at every stage of the funnel, which in turn allowed us to identify which channel and which message variant was producing the qualified meetings. By the end of the first three weeks, the dashboard had become the operating instrument the owner reviewed every Friday afternoon.",
          "We deliberately resisted the temptation to build more. No automation tools were introduced. No multichannel orchestration platform was purchased. No content calendar was layered on top. The discipline of the build was to ship the smallest system that could produce the result, because anything more would have created maintenance overhead the owner would have to absorb after the engagement ended.",
        ],
      },
      {
        heading: "Activation",
        body: [
          "Activation began on the eleventh working day. The first week of live outreach is almost always the most difficult, and this engagement was no exception. The owner sent the first batch of twenty touches and immediately wanted to revise the messaging based on the first three replies, two of which were polite declines and one of which was silence. We held the line. The methodology requires fifty touches before any directional read can be drawn from response data. Below that volume, the noise overwhelms the signal.",
          "By the end of the first week, ninety eight touches had gone out. Reply rate was running at eleven percent across both channels combined. Qualified meeting rate was lower than the forecast, which we expected. The first week always under indexes because the freshest accounts on a cold list are also the ones most likely to ignore an unfamiliar sender. The second week is where the rhythm starts to produce.",
          "The second week produced four qualified conversations, the third produced three, and the cumulative pace from week four onwards held steady at roughly two per week. The dashboard told us which message variants were doing the work, which segments within the target were responding, and where in the sequence the qualified meetings were being booked. The most surprising finding was that the third email in the cold sequence, the one we had labelled the soft pattern interrupt, was producing nearly forty percent of the qualified bookings on its own. That single insight changed the structural weight we placed on the third touch in every subsequent engagement of this type.",
          "Activation also surfaced a secondary benefit we had not forecast. The discipline of twenty touches per day, captured in a dashboard reviewed every Friday, changed the owner's relationship to the business. The Monday morning anxiety about runway dissolved because the runway question had been replaced by a different question. How many qualified conversations are on the calendar this week. That question has an answer that updates daily, and an answer that the owner can influence directly through the next twenty touches.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "At the close of week six, the dashboard recorded eleven qualified discovery calls held with named accounts inside the target segment. Two of those calls converted to retainer engagements within the subsequent thirty days, producing approximately nine thousand four hundred dollars of new monthly recurring revenue. Three additional calls remained in active follow up at handover, two of which closed in the months following the engagement.",
          "Beyond the headline numbers, three structural outcomes mattered more. The pipeline was no longer dependent on referrals. The forecasting horizon extended from one month to one quarter, because the rhythm of qualified conversations had become predictable enough to model. And the owner had a system they could continue to operate, a dashboard they understood, a target list they could refresh, and a sequence they could iterate on, without our involvement.",
          "Six months after the engagement closed, the owner reported that the rhythm had been maintained, that the outreach volume had actually increased to twenty five touches per day after the operator gained confidence in the system, and that retainer revenue had grown to a level that allowed the first delivery hire in the history of the practice. The hire freed the owner to concentrate more time on the outreach itself, which in turn accelerated the pipeline further. That is the compounding loop the original system was designed to start.",
        ],
      },
      {
        heading: "Reflection",
        body: [
          "This engagement is included in the case study set because it illustrates a pattern we see repeatedly. Owners describe a lead generation problem when the deeper issue is the absence of any structured demand activity at all. The instinct is to add complexity. Hire an agency. Buy a tool. Launch an ad campaign. Start a podcast. Each of those moves can work, and each of them takes months to produce a result, and each of them costs more in cash and attention than the simpler intervention.",
          "The simpler intervention is to accept that the practice needs to send messages to strangers on a recurring basis, design those messages with care, send them at a sustainable cadence, measure what happens, and adjust. The mechanics of this work are not glamorous. They are the daily reps of a business that has decided to take responsibility for its own pipeline rather than wait for the next referral to arrive.",
          "The framework documented here has now been deployed across more than a dozen independent practices and small consulting firms. The specific numbers vary with the segment, the offer, and the operator's discipline. The structural pattern, twenty touches per day, narrow target, three email sequence, weekly dashboard review, six week horizon, holds with remarkable consistency.",
        ],
      },
    ],
    result:
      "Eleven qualified discovery calls in six weeks. Two converted to retainer clients within the following month. Pipeline shifted from empty and unpredictable to consistently active, with a system the owner continues to operate independently.",
    label: CONCEPT_LABEL,
  },

  // ============================================================
  // 02 — REVENUE SYSTEMS (full 3000w)
  // ============================================================
  {
    id: "revenue-systems",
    category: "Revenue Systems",
    tag: "Revenue Systems",
    title: "Closing $4,800 in Thirty Days With Zero Ad Spend",
    subtitle:
      "How a solo coach packaged and sold a high ticket offer using only direct conversations, deliberate positioning, and a tracked sales motion.",
    clientType:
      "Solo business coach, personal brand, selling one to one services to founders and operators in the sub one million revenue band.",
    challenge:
      "Strong expertise, no structured offer, no pricing logic, and no consistent way to convert the conversations the practice was already having into paid engagements. Months of high effort produced sporadic income that did not justify the time invested.",
    metrics: [
      { label: "Closed in first 30 days", value: "$4,800" },
      { label: "Discovery call conversion", value: "60%" },
      { label: "Offer tiers built", value: "2" },
      { label: "Paid acquisition spend", value: "$0" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "The practice had been operating for almost three years when the engagement began. The coach had built a small but engaged audience through consistent posting on a single platform, had developed a real point of view on the work, and had earned the kind of inbound conversations that most solo operators spend years trying to attract. From the outside, the conditions for a thriving business were in place.",
          "From the inside, the income statement told a different story. The practice was producing revenue, but irregularly and at price points that did not reflect the value being delivered. Some clients paid four hundred dollars for a packaged programme that took twelve hours of delivery time. Other clients negotiated bespoke arrangements that landed at one hundred and fifty dollars per session for work that required substantial preparation. There was no consistent answer to the question of what the practice charged or for what.",
          "The owner described the problem as needing more leads. We listened to that framing for the first two conversations and then gently challenged it. The volume of conversations was not the constraint. The conversion of those conversations into paid engagements at an appropriate price point was the constraint, and that constraint had two roots. There was no offer to sell, in the sense of a defined package with a defined price and a defined outcome. And there was no sales motion to sell it through, in the sense of a structured conversation that moved a prospect from interest to commitment.",
          "The brief we accepted was narrow and aggressive. Build a high ticket offer. Build the conversation that sells it. Test both in the market within thirty days. Do not rely on advertising. Use only the conversations the practice was already having through the existing audience and inbound channels.",
        ],
      },
      {
        heading: "Diagnosis",
        body: [
          "The deeper diagnosis required two days of working sessions and one uncomfortable spreadsheet. The spreadsheet listed every paid engagement of the prior twelve months, the price charged, the hours delivered, the outcome produced for the client, and a subjective rating of how energising or draining the engagement had been to deliver. The picture that emerged was instructive and slightly painful.",
          "The most profitable engagements per delivery hour were not the ones the owner had been actively promoting. They were a handful of bespoke arrangements that had emerged from extended conversations with founders, in which the owner had effectively been operating as a fractional advisor rather than a session based coach. Those engagements had landed at price points between two and five times the published session rate, had produced clearly articulable outcomes for the client, and had been consistently rated as energising work.",
          "The session based offers, by contrast, were the lowest paid per delivery hour, the most operationally heavy because they required scheduling and rescheduling, and the most likely to attract the kind of client who treated the relationship transactionally. The pattern was clear. The market was already telling the owner what to sell, and the owner was not listening because the bespoke work had emerged organically rather than through deliberate productisation.",
          "The second part of the diagnosis concerned the sales conversation itself. We listened to recordings of three recent prospect calls. In all three, the owner had spent the majority of the conversation in delivery mode, offering frameworks and tactical advice, rather than in qualification and proposal mode. The prospect left the call having received substantial value at no cost and with no clear next step. The conversion rate of those calls was approximately fifteen percent, which is well below the rate a structured discovery process should produce. The fix here was not to make the owner less generous. It was to redirect the generosity toward the part of the conversation where it would compound, which is the framing of the engagement rather than the substance of it.",
        ],
      },
      {
        heading: "Strategy",
        body: [
          "The strategy had three pillars. Productise the bespoke work into two named offers at deliberate price points. Restructure the discovery call into a qualification conversation rather than a free consulting session. And put a simple tracking system in place so that every conversation produced a data point that could be used to refine the next one.",
          "On productisation, we built two tiers. A flagship engagement priced at three thousand dollars, structured as a defined three month programme with a clearly described outcome and a fixed cadence of touchpoints. And an entry tier at fifteen hundred dollars, structured as a six week intensive aimed at prospects who needed a smaller initial commitment to test the working relationship. The pricing was not arbitrary. It was calibrated against what the bespoke engagements had historically commanded, with a deliberate uplift to account for the fact that the productised version included tighter delivery constraints and stronger commitments from the practice side.",
          "On the sales motion, we rebuilt the discovery call structure. The new format ran for forty five minutes and followed a six step sequence. Open with the prospect's reason for booking the call. Diagnose the current state in their own words. Surface the gap between current state and desired state. Frame the type of work that closes that gap. Present the appropriate tier with pricing. Confirm fit and either schedule a follow up or close. The structural change here was that the substantive consulting work was deferred until the engagement had been agreed, rather than given away in the qualification conversation itself.",
          "On tracking, we built a simple Notion based pipeline that captured every booked discovery call, the outcome, the offer presented, the objection raised if any, and the close status. The pipeline was reviewed daily for the first two weeks and weekly thereafter. The purpose of the tracking was less about reporting and more about producing the discipline of treating every conversation as a designed event rather than a freeform interaction.",
        ],
      },
      {
        heading: "Build",
        body: [
          "The build phase ran for seven days. The deliverables were tightly scoped because the engagement window was thirty days and we needed at least three weeks of live testing to produce meaningful outcomes. The two offer tiers were documented as one page descriptions covering the outcome, the structure, the cadence, the price, and the inclusions. The descriptions were written in the second person, addressed to the prospect, and were designed to be readable in under ninety seconds.",
          "The discovery call structure was documented as a one page operator guide with the six step sequence, suggested transitional language for each step, and a list of the three most common objections with prepared responses. The objections were not invented. They were extracted from the recordings of the prior three calls and from the patterns the owner could recall from the past year of conversations. The prepared responses were not scripts. They were structural moves that allowed the owner to maintain the integrity of the offer without becoming defensive.",
          "The Notion pipeline was built with five views. New conversations, scheduled discovery calls, calls completed awaiting decision, closed won, and closed lost. Each card carried the prospect name, the source of the conversation, the offer presented, the objection if any, and the date of the next action. The system was designed to be operable in under two minutes per call, because anything heavier would not have survived the third week.",
          "We also built a single follow up sequence for prospects who left the discovery call without committing. The sequence ran across seven days, three messages, with a defined structural purpose for each. A summary of the conversation and the recommended path. A prompt that named a specific concern the prospect had raised. A respectful close that left the door open without applying pressure. The purpose of the sequence was to recover the meaningful percentage of prospects who genuinely intended to proceed but who would have otherwise drifted out of the funnel through pure inertia.",
        ],
      },
      {
        heading: "Activation",
        body: [
          "Activation in this engagement looked different from a typical outbound build because the inbound conversations were already happening. The intervention was at the point of the conversation rather than upstream of it. From day eight, every prospect who booked a discovery call was offered the new structure and presented with the new tiers.",
          "The first week of activation produced four discovery calls, two of which converted to the entry tier within the call itself. That outcome would have been considered exceptional in a steady state, and we treated it as a data point rather than a trend. The second week produced five discovery calls and three closed engagements, two at the entry tier and one at the flagship. By the end of the second week, the practice had closed three thousand dollars of new revenue against a previous twelve month average closing rate that would have produced perhaps eight hundred dollars in the same window.",
          "The third week produced a different challenge. The owner began to feel uncomfortable with the conversion rate, not because it was too low, but because it was high enough to feel suspicious. We addressed the discomfort directly. The conversion rate was not a sign of something being wrong. It was a sign of three things being right simultaneously for the first time. The prospects were qualified before the call because they had self selected through the existing audience. The offer was clearly priced and clearly described. The conversation was structured to surface fit rather than to perform expertise. When those three conditions hold, conversion rates of fifty to seventy percent on warm inbound calls are entirely consistent with the structural design.",
          "The fourth week produced four additional discovery calls and two more closed engagements, bringing the total to seven engagements closed across the thirty day window. Total revenue closed across the period was approximately four thousand eight hundred dollars, against a previous monthly average of approximately fifteen hundred dollars. The conversion rate across all discovery calls held at approximately sixty percent.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The headline outcome was four thousand eight hundred dollars closed in the first thirty days at a sixty percent conversion rate on discovery calls. The structural outcomes were more significant. The practice had a documented offer suite that could be referenced consistently across audience touchpoints. The discovery call had been transformed from an unpredictable consulting session into a designed conversation with a known structure and a known close rate. And the owner had a tracking instrument that produced weekly visibility into the health of the pipeline.",
          "Equally important was the change in the owner's relationship to pricing. In the prior twelve months, the owner had quietly absorbed the discomfort of charging less than the work was worth, and that absorption had produced a slow accumulation of resentment that had begun to show up in delivery quality. After the first three closes at the new tiers, that pattern reversed. The owner reported that the work felt different to deliver because the price point had created a different kind of commitment from the client at the start of the engagement. Higher commitment from the client produced better engagement, which produced better outcomes, which produced clearer testimonials, which produced more qualified inbound conversations. That loop is the second order benefit of pricing accurately.",
          "Six months after the engagement closed, the practice had stabilised at approximately twelve thousand dollars of monthly recurring revenue across a portfolio of flagship and entry tier clients, with a maintained discovery call conversion rate above fifty percent and a deliberate cap on new client intake to protect delivery quality.",
        ],
      },
      {
        heading: "Reflection",
        body: [
          "This engagement is included in the case study set because it surfaces a counter intuitive truth about solo practices. The constraint is rarely audience size or lead volume. The constraint is almost always the absence of a defined offer at a defensible price, and the absence of a structured conversation that can carry a prospect from interest to commitment without depending on the owner's improvisation.",
          "Both of those gaps are fixable in a matter of days, and the fix produces a step change in revenue rather than a marginal improvement. The reason most practices do not close those gaps is not lack of capability. It is the discomfort of naming a price, the discomfort of asking for a decision, and the discomfort of holding the structure of a conversation when the prospect would prefer to receive free advice indefinitely.",
          "The framework documented here is deliberately spare. Two tiers, one discovery script, one tracking pipeline, one follow up sequence. The simplicity is intentional. Anything more elaborate would have collapsed under the weight of its own maintenance, and would have allowed the owner to mistake activity for progress. The progress in this engagement came from the discipline of holding a small number of structural decisions consistently for thirty days.",
        ],
      },
    ],
    result:
      "Four thousand eight hundred dollars closed within thirty days. Sixty percent discovery call conversion rate. Two priced offer tiers established. A tracked pipeline the owner continues to operate independently.",
    label: CONCEPT_LABEL,
  },

  // ============================================================
  // 03 — GROWTH STRATEGY (full 3000w)
  // ============================================================
  {
    id: "growth-strategy",
    category: "Growth Strategy",
    tag: "Growth Strategy",
    title: "Tripling Pipeline for a Digital Agency in Ninety Days",
    subtitle:
      "Replacing scattered tactical activity with a demand system that runs in the background and frees the owner to focus on delivery.",
    clientType:
      "Small digital agency, three person team, serving local and regional businesses with website, brand, and digital marketing services.",
    challenge:
      "A textbook feast or famine cycle. Client work consumed all available capacity, business development happened only when current projects were ending, and pipeline volatility was producing real cash flow stress at the end of every quarter.",
    metrics: [
      { label: "Pipeline growth in 90 days", value: "3×" },
      { label: "Hours reclaimed per week", value: "8" },
      { label: "Outbound channels stabilised", value: "2" },
      { label: "Content cadence", value: "2 posts/wk" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "The agency had been operating for just over four years when we engaged. Three people on the team. One owner who handled strategy, sales, and the most demanding client relationships. One designer who carried most of the visual delivery. One developer who handled the technical work and a small amount of project management. Annual revenue had grown each year for the first three years and had then plateaued in the fourth.",
          "The plateau was not the result of a market problem. The agency's work was strong, the client portfolio was respectable, and the testimonials were specific and credible. The plateau was the result of an operating constraint that had become invisible to the team because they were inside it. Every member of the team, including the owner, was fully consumed by client delivery, and there was no surplus capacity left over for the activity that produces the next quarter's revenue.",
          "The cycle ran predictably. A large project would land. The team would absorb it for eight to twelve weeks. As the project approached its final milestones, the owner would surface and begin reactivating dormant prospects, sending follow up notes to past clients, and accepting any inbound conversation that arrived. New work would arrive in the four to six weeks after the previous project closed, often with a gap of two to four weeks of underutilised capacity in between. That gap was the source of the cash flow stress, because fixed costs continued to accrue while billable hours dropped.",
          "The brief we accepted was structural. Build a demand system that produces qualified pipeline activity continuously rather than reactively, can be operated by the owner in approximately one hour per day rather than as a full time job, and is robust enough to survive the next ten to twelve week project absorption cycle without going dark.",
        ],
      },
      {
        heading: "Diagnosis",
        body: [
          "The diagnosis surfaced three structural failures that had to be named before any system could be designed. The first was the absence of a defined ideal client profile. The agency had served everyone who had asked, which had produced a portfolio of work too varied to be referenced credibly in a sales conversation. When the owner described the agency to a new prospect, the description shifted depending on the prospect, which signalled to the buyer that the agency was looking for the work rather than that the work was looking for the agency.",
          "The second failure was the absence of any consistent outbound activity. Outreach happened only in the gap weeks between projects, which meant that every campaign started cold, produced no momentum, and was abandoned as soon as new work arrived. The agency had effectively been running a series of one off sprints rather than a sustained programme, and one off sprints in cold outbound do not produce reliable pipeline because the response rate is dominated by the second and third touch on each contact, which never happened.",
          "The third failure was the absence of any content presence that could produce inbound discovery. The owner had posted occasionally to a single platform but without any structural cadence and without a clear point of view on the work. The posts existed but they did not accumulate into a recognisable position, which meant that prospects who searched for the agency after a referral encountered a thin and uneven public footprint that did nothing to reinforce the credibility of the warm introduction.",
          "Those three failures interacted in a way that produced the plateau. No defined target meant that outbound could not be designed. No sustained outbound meant that pipeline could not compound. No content presence meant that referrals could not be amplified. The fix had to address all three simultaneously because addressing any one in isolation would not have moved the needle on the others.",
        ],
      },
      {
        heading: "Strategy",
        body: [
          "The strategic frame had four parts. Define the ideal client profile to a level of specificity that would allow a list to be built. Design a semi automated outbound motion that the owner could operate in approximately thirty minutes per day. Establish a content cadence of two posts per week with a defined editorial frame. And institute a monthly pipeline review that would force the team to look at the system as a whole rather than at individual projects in isolation.",
          "On the ideal client profile, we worked from the past three years of closed engagements and identified the segment that had produced the strongest combination of margin, retention, and referral generation. The segment was narrower than the agency had previously imagined possible, defined by industry vertical, company size band, and a specific operational situation that signalled readiness for the kind of work the agency did best. Once defined, the segment supported a target list of approximately four hundred named accounts within the agency's serviceable region.",
          "On the outbound motion, we designed a workflow that combined LinkedIn connection requests with personalised notes, a two message follow up sequence on accepted connections, and a parallel cold email sequence to the same accounts using verified contact data. The motion was designed to consume approximately thirty minutes of the owner's time per day, with the actual sending handled through a tool stack that the owner already owned a license to. The volume target was fifteen new touches per day, which over the ninety day engagement window would produce approximately one thousand touches against the four hundred account list, with each account receiving roughly two to three touches across the period.",
          "On content, we defined an editorial frame around a single category of insight that the agency was uniquely positioned to provide based on its delivery experience. Two posts per week, one short observation and one longer breakdown, both written by the owner with light editorial support. The cadence was deliberately modest because a sustained two posts per week for ninety days produces twenty six posts, which is more than enough to establish a recognisable position when the underlying point of view is consistent.",
          "On pipeline review, we instituted a monthly working session in which the owner walked through the dashboard, named the leading and lagging indicators, and made a deliberate decision about whether to adjust any element of the system. The review was designed to take ninety minutes per month and to produce one or two structural decisions rather than a long list of tactical adjustments.",
        ],
      },
      {
        heading: "Build",
        body: [
          "The build phase ran for the first three weeks of the ninety day engagement. The deliverables were the ideal client profile document, the four hundred account target list with verified primary contacts, the LinkedIn connection request and follow up templates, the cold email sequence, the editorial frame for content, the dashboard for pipeline tracking, and the monthly review template.",
          "The target list deserves a separate note because it consumed more time than any other build component. List quality is the single largest determinant of outbound performance, and most agencies underinvest in it. We worked through three sources to triangulate the list. Industry directories filtered to the defined segment. LinkedIn search using the agency's existing premium account. And a small number of paid data enrichment queries to verify email addresses for the highest priority accounts. The result was four hundred accounts each carrying a primary contact name, a verified email, a LinkedIn profile URL, and a one line note on why the account fitted the profile.",
          "The dashboard was built in a tool the team already used internally for project tracking, which avoided the introduction of any new system. The dashboard captured weekly outbound volume, response rates by channel, qualified meetings booked, proposals sent, proposals closed, and the rolling pipeline value. Each metric had a defined calculation and a target range. The dashboard was designed to be readable in under five minutes and to produce a single number, the pipeline coverage ratio, which signalled at a glance whether the system was producing enough qualified activity to sustain the agency's revenue target.",
          "We also built a content library of the first month's posts in advance of activation, which we treated as a critical component of the build rather than an optional extra. The reason for the advance build was that the second and third weeks of activation are typically the weeks when the owner's attention gets pulled back into delivery, and an empty content queue at that point would have produced a gap that broke the cadence. With four weeks of posts already drafted and scheduled, the cadence would survive the predictable distractions of the early activation period.",
        ],
      },
      {
        heading: "Activation",
        body: [
          "Activation began at the start of the fourth week. The first week of live operation produced seventy five touches, a connection acceptance rate of approximately thirty four percent on LinkedIn, an email open rate of fifty one percent, and a reply rate of eight percent across both channels combined. Two qualified discovery calls were booked from the first week of activity. Both came from the LinkedIn channel and both were second touch responses rather than initial contacts, which is consistent with the sequence design.",
          "The second and third weeks produced a steady accumulation of qualified meetings, with the rate climbing from two per week to four per week as the response curve compounded across the second and third touches on each account. By the end of the sixth week of activation, which was the ninth week of the engagement, the agency had booked seventeen qualified discovery calls, had converted four to active proposal stage, and had closed two new engagements totaling approximately forty thousand dollars of project revenue.",
          "The content cadence held throughout the period. Two posts per week, no missed weeks, with a steady but modest accumulation of engagement on the platform. The owner reported that several inbound conversations during the period began with a specific reference to a recent post, which we took as a signal that the editorial frame was beginning to function as a credibility amplifier even though the absolute reach numbers remained modest.",
          "The most instructive moment in the activation phase came in week eight, when a large project landed and absorbed the team for the subsequent six weeks. In a previous cycle, this would have caused the outbound activity to collapse. In this cycle, the system was robust enough that the owner maintained the daily thirty minute outbound rhythm and the twice weekly content cadence throughout the absorption period. The pipeline did not go dark. By the end of the ninety day engagement, the pipeline coverage ratio had climbed from a baseline of approximately one to a stable level above three, which is the structural threshold below which feast or famine cycles tend to recur.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The headline outcomes were a tripling of the rolling pipeline value over ninety days, eight hours per week of owner time reclaimed from reactive prospecting and redirected toward deliberate system operation, and the establishment of a content presence that was beginning to produce inbound conversations as a secondary channel. Two new engagements totaling approximately forty thousand dollars of project revenue had closed within the engagement window, with three additional opportunities in active proposal stage at handover.",
          "The structural outcomes were more important than the headline numbers. The agency had moved from reactive sprints to a sustained operating rhythm. The owner had a dashboard that produced an honest read on the health of the pipeline at any moment, which removed the end of quarter anxiety that had previously dominated the management cadence. And the team had a defensible answer to the question of what the agency did and for whom, which over time would compound into a sharper public position and a stronger referral network.",
          "Six months after the engagement closed, the agency had hired a fourth team member, a junior project manager, which freed the owner to spend more deliberate time on outbound and content. The pipeline coverage ratio had stabilised above three and the feast or famine cycle had not returned. The agency had also raised its average project price point by approximately twenty percent, which was an indirect outcome of the sharper positioning rather than a deliberate pricing intervention.",
        ],
      },
      {
        heading: "Reflection",
        body: [
          "This engagement is included in the case study set because the feast or famine cycle is the single most common operating pathology in small agencies and consultancies, and because the fix is structural rather than tactical. Most agencies attempt to solve the cycle by adding marketing tactics, hiring a salesperson, or chasing a new service line. Each of those moves can help in a particular context, and each of them tends to fail when the underlying issue is that the operating rhythm of the business has no place for sustained demand activity.",
          "The structural fix is a defined target, a daily outbound rhythm the owner can sustain alongside delivery, a modest content cadence with a clear editorial frame, and a monthly review that holds the system accountable. None of those components are individually novel. The novelty is in the integration and in the discipline of running the integrated system for ninety days without breaking the rhythm during a delivery absorption period.",
          "The engagement also illustrates a quieter outcome that does not appear in the dashboard. The owner reported that the cash flow anxiety that had dominated the previous four years of the business had subsided. That subsidence is not a metric. It is the lived experience of running a business that has taken responsibility for its own pipeline rather than waiting for the next reactive cycle to begin.",
        ],
      },
    ],
    result:
      "Pipeline grew threefold across ninety days. Owner reclaimed eight hours per week previously absorbed by reactive prospecting. Two new engagements totaling approximately forty thousand dollars closed within the window. Feast or famine cycle structurally resolved.",
    label: CONCEPT_LABEL,
  },

  // ============================================================
  // 04 — AI AUTOMATION & SYSTEMS (full 3000w)
  // ============================================================
  {
    id: "ai-automation",
    category: "AI Automation & Systems",
    tag: "AI Automation & Systems",
    title: "Fourteen Hours Per Week Reclaimed by a Solo Consultant",
    subtitle:
      "How an independent consultant eliminated repetitive operations and redirected the recovered time toward business development that compounded.",
    clientType:
      "Independent business consultant, solo operator, B2B focused, retainer based revenue model with a small portfolio of long term clients.",
    challenge:
      "Three or more hours per day consumed by repetitive operational tasks. Manual follow ups, lead tracking spread across three tools, weekly reporting assembled by hand, and calendar coordination that required active mediation. No surplus time for strategy or business development.",
    metrics: [
      { label: "Hours saved per week", value: "14" },
      { label: "Recovered time on BD", value: "80%" },
      { label: "Pipeline activity uplift", value: "2×" },
      { label: "New headcount required", value: "0" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "The consultant had been operating independently for almost seven years when the engagement began. The practice had evolved from project based work in the early years to a stable retainer portfolio of six clients, each engaged on a monthly cadence with a mix of strategic advisory and tactical execution support. Annual revenue had grown each year for the first five years and had then plateaued, despite the demand environment remaining strong and the inbound conversation flow remaining healthy.",
          "The plateau was not a demand problem. The plateau was a capacity problem dressed up as a demand problem. The consultant was fully consumed by the operating rhythm of the existing portfolio, and there was no surplus attention available to deepen the highest value retainers, to convert the inbound conversations that continued to arrive, or to invest in the kind of thinking time that produces the next stage of the practice.",
          "When we mapped a typical week with the consultant, the picture was clear. Approximately fifty four hours of working time per week. Approximately thirty six hours absorbed by direct client delivery. Approximately fifteen hours absorbed by what the consultant described as administration but which was on closer inspection a collection of repetitive operational tasks that recurred every week, every month, or every quarter with predictable structure. Approximately three hours per week available for anything resembling business development or strategic work on the practice itself.",
          "The brief we accepted was direct. Reduce the operational hours by at least half, without compromising the quality of the work the consultant delivered to clients, and without introducing a tool stack that would require its own ongoing maintenance burden. The recovered time would be redirected toward business development, with the explicit goal of producing measurable pipeline uplift within sixty days of the new system going live.",
        ],
      },
      {
        heading: "Diagnosis",
        body: [
          "The diagnosis ran across three working sessions in which we documented every recurring operational task in the consultant's week, classified each task by frequency and average time consumed, and identified which tasks were candidates for automation, which were candidates for elimination, and which were genuinely irreducible.",
          "The audit produced a list of eighteen recurring tasks. Of those, four accounted for approximately seventy percent of the operational hours. Lead and prospect follow up, which the consultant performed manually after every conversation and which consumed approximately four hours per week. Pipeline tracking, which was spread across a CRM, a spreadsheet, and a notes application, with information being copied between the three approximately twice per week and consuming approximately three hours per week. Weekly client reporting, which the consultant assembled by hand for each retainer client every Friday and which consumed approximately five hours per week. And calendar coordination, which involved active mediation of scheduling requests across multiple time zones and consumed approximately three hours per week.",
          "The remaining fourteen tasks accounted for the other thirty percent of operational hours and were a long tail of smaller items, none individually significant but cumulatively meaningful. The strategic decision was to focus the build on the four largest items first, because the marginal time recovery per hour of build effort was substantially higher on those four than on any of the smaller items.",
          "A second observation from the diagnosis was that the existing tool stack was not the constraint. The consultant already owned licenses to a CRM, a calendar tool, a project management tool, and a billing platform that had AI capabilities embedded but unused. The constraint was that none of those tools were configured to work together, and none of them had been deliberately designed around the workflow they were nominally supporting. The build phase would not require new tools. It would require deliberate configuration of the existing ones, supplemented by a small number of lightweight automation flows.",
        ],
      },
      {
        heading: "Strategy",
        body: [
          "The strategic frame had three principles. Automate before you eliminate, eliminate before you delegate, and delegate before you accept. The order matters because each principle handles a different category of task. Automation handles tasks that are structurally repeatable and can be performed by a system. Elimination handles tasks that have accumulated by inertia and that no longer serve a defensible purpose. Delegation handles tasks that genuinely require human judgement but do not require the consultant's specific judgement. Acceptance handles the residual tasks that are genuinely irreducible and must remain in the consultant's hands.",
          "Applying that frame to the four largest items produced clear pathways. Lead and prospect follow up was a candidate for automation through a sequence triggered by lead behaviour rather than by manual review. Pipeline tracking was a candidate for elimination of the duplicated systems through consolidation into a single source of truth, with automated synchronisation to the surfaces where the data needed to appear. Weekly client reporting was a candidate for automation through a templated report that pulled data from the existing tool stack and assembled itself, with the consultant retaining final review and editorial control. Calendar coordination was a candidate for automation through a structured booking link with embedded constraints rather than active mediation.",
          "The strategic principle that anchored the entire build was that automation should remove the operational labour without removing the consultant's judgement at the points where judgement actually mattered. The weekly report would still be reviewed and signed off by the consultant. The follow up sequence would still be paused for any prospect who had moved into a substantive conversation. The pipeline data would still be reviewed deliberately on a weekly cadence. The calendar booking link would still be supplemented by direct outreach for the small number of conversations that required handcrafted scheduling. Automation handled the labour. The consultant retained the judgement.",
        ],
      },
      {
        heading: "Build",
        body: [
          "The build phase ran for fifteen working days. The deliverables were sequenced to address the highest value items first so that time recovery would begin compounding before the build was complete.",
          "The follow up sequence was built first. Five touches across fifteen days, structured around behavioural triggers rather than fixed time intervals. The triggers included email open without reply, link click without booking, meeting attended without next step confirmed, and proposal sent without response. Each trigger produced a different message variant, with content that referenced the specific behaviour in a way that felt observed rather than automated. The sequence was paused automatically for any prospect who replied substantively, returning the conversation to the consultant's direct attention.",
          "The pipeline consolidation was built second. The CRM was elevated to the single source of truth, the spreadsheet was deprecated, and the notes application was reconfigured to push relevant updates into the CRM through a lightweight automation flow. The migration of historical data took approximately two days and was executed in a single batch rather than incrementally to avoid the maintenance burden of running two systems in parallel.",
          "The reporting automation was built third. A templated report was designed in collaboration with the consultant, capturing the data points that each retainer client actually used in their decision making rather than the data points that had accumulated over time. The template pulled live data from the CRM, the project management tool, and the billing platform through a combination of native integrations and a small custom workflow. The report was generated automatically on Friday morning, surfaced to the consultant for review and editorial commentary, and dispatched to clients on Friday afternoon. The total time per report dropped from approximately fifty minutes to approximately seven minutes of editorial review.",
          "The calendar automation was built last. A structured booking link was configured with embedded constraints around availability windows, buffer time between meetings, time zone handling, and meeting type defaults. The link was integrated into the consultant's email signature, the LinkedIn profile, and the discovery call follow up sequence. Active calendar mediation was reserved for a small number of high priority conversations that the consultant flagged manually.",
        ],
      },
      {
        heading: "Activation",
        body: [
          "Activation was phased rather than executed as a single cutover, because automating four interlocking workflows simultaneously would have created a high risk of compounding errors that would have been difficult to diagnose. Each automation went live in turn, with a one week observation window before the next was activated.",
          "The follow up sequence went live first. Within the first week, the sequence had produced two additional qualified replies that the consultant attributed directly to the automated touches that would not otherwise have happened. The consultant's manual follow up time dropped from approximately four hours per week to approximately forty minutes per week of exception handling.",
          "The pipeline consolidation went live in week two. The transition produced two days of mild discomfort as the consultant adjusted to a single interface rather than three, after which the time spent on pipeline maintenance dropped from approximately three hours per week to approximately thirty minutes of weekly review. The CRM became the working surface rather than a downstream record keeping system, which produced a secondary benefit of better real time visibility into the state of every active opportunity.",
          "The reporting automation went live in week three. The first automated report cycle required approximately forty minutes of editorial review across the six retainer clients combined, against the previous five hours per week of manual assembly. By the third report cycle, the editorial review time had dropped to approximately twenty minutes total, because the consultant had developed a rhythm for the new format and had refined the template to reduce the most common edits.",
          "The calendar automation went live in week four. The transition was the smoothest of the four because the structured booking link did most of the work without any change in client behaviour. The consultant's calendar coordination time dropped from approximately three hours per week to approximately twenty minutes of exception handling.",
          "By the end of the activation period, the cumulative time recovery was approximately fourteen hours per week, against an initial target of approximately seven and a half hours. The over delivery was a function of the secondary benefits of consolidation, which produced more time recovery than any single automation in isolation.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The headline outcomes were fourteen hours per week of reclaimed time and a stated redirection of approximately eighty percent of that recovered time toward business development activity, with the remaining twenty percent absorbed by genuine surplus rest that the consultant had not previously permitted.",
          "Within sixty days of the new system going live, the consultant reported that pipeline activity had approximately doubled, measured in terms of qualified discovery conversations held per month. The doubling was not the result of any new acquisition channel. It was the result of the consultant having the time and attention to operate the existing channels deliberately rather than reactively. Inbound conversations were responded to faster, follow ups were initiated rather than deferred, and the small number of outbound contacts the consultant had always intended to make finally got made.",
          "The structural outcomes were more durable than the time recovery itself. The practice now had a documented operating system that could survive a holiday or an unexpected absence without the entire pipeline going cold. The retainer reporting cadence was tighter and more credible, which directly contributed to two retainer expansions during the engagement period. And the consultant's relationship to operational work had changed permanently, because the experience of recovering fourteen hours per week had made it impossible to accept the prior baseline.",
          "Six months after the engagement closed, the consultant had added two new retainer clients to the portfolio without adding any operational headcount. The total portfolio revenue had grown by approximately thirty percent over the six month period, against a baseline of approximately zero growth in each of the prior two years.",
        ],
      },
      {
        heading: "Reflection",
        body: [
          "This engagement is included in the case study set because the operational drag on solo and small practices is consistently underestimated, and because the recovery of operational time is consistently misallocated when it does happen. Most operators who recover ten or more hours per week through automation absorb the recovered time back into client delivery, often by accepting one additional client at the same per hour rate as the previous portfolio. That move increases revenue marginally but does not change the structural position of the practice, because the operator remains fully consumed by delivery.",
          "The deliberate redirection of recovered time toward business development is the move that produces compounding outcomes. It is also the move that requires the most discipline, because the recovered hours feel optional in a way that client work does not, and the temptation to absorb them into delivery is constant. The structural defence against that temptation is to schedule the recovered time as a recurring commitment in the calendar, with a defined activity for each block, and to treat the commitment with the same seriousness as a client meeting.",
          "The framework documented here also illustrates a principle we apply across all automation engagements. The goal is never to automate everything. The goal is to automate the labour at the points where labour is genuinely repeatable, and to preserve the operator's judgement at the points where judgement actually produces value. The distinction sounds obvious in the abstract and is consistently mishandled in practice, because the temptation to automate visible activity is stronger than the discipline of automating only what should be automated.",
          "The recovered fourteen hours per week, redirected with intent, produced a thirty percent revenue uplift over six months without any additional headcount. That ratio is the structural argument for the work.",
        ],
      },
    ],
    result:
      "Fourteen hours per week reclaimed. Eighty percent of recovered time redirected to business development. Pipeline activity doubled within sixty days. Portfolio revenue grew approximately thirty percent over the following six months without additional headcount.",
    label: CONCEPT_LABEL,
  },

  // ============================================================
  // 05–14 — STUBS, full 3000w copy to be added in subsequent batches
  // ============================================================
  {
    id: "linkedin-authority-build",
    category: "B2B Lead Generation",
    tag: "B2B Lead Generation",
    title: "Building a Recognisable Authority Position from a Cold Profile",
    subtitle:
      "How a fractional operator turned an empty LinkedIn presence into a sustained inbound channel within ninety days.",
    clientType: "Fractional operator, B2B services, no prior public presence.",
    challenge:
      "Strong delivery record, no public footprint, and no inbound flow. Every new engagement was won through one to one outreach, which capped the practice at the owner's available outbound hours.",
    metrics: [
      { label: "Inbound conversations in 90 days", value: "23" },
      { label: "Profile views uplift", value: "12×" },
      { label: "Follower growth", value: "+1,400" },
      { label: "Posts published", value: "26" },
    ],
    sections: [
      { heading: "Context", body: ["Full 3000 word narrative pending in next batch."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Twenty three inbound conversations in ninety days from a previously dormant profile. Sustained two posts per week cadence with a defensible editorial frame.",
    label: CONCEPT_LABEL,
  },
  {
    id: "cold-email-revival",
    category: "B2B Lead Generation",
    tag: "B2B Lead Generation",
    title: "Reviving a Cold Email Channel That Had Been Written Off",
    subtitle:
      "How a boutique consultancy rebuilt an outbound email programme after concluding the channel was dead.",
    clientType: "Boutique strategy consultancy, four person team, mid market focus.",
    challenge:
      "Previous cold email attempts had produced low single digit response rates and the team had concluded the channel was not viable. Pipeline depended on referrals that had begun to thin.",
    metrics: [
      { label: "Reply rate uplift", value: "4× → 14%" },
      { label: "Qualified meetings in 60 days", value: "9" },
      { label: "Email sequence touches", value: "3" },
      { label: "Domain warmth window", value: "2 weeks" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Reply rate moved from low single digits to a sustained fourteen percent. Nine qualified meetings booked within sixty days of relaunch.",
    label: CONCEPT_LABEL,
  },
  {
    id: "offer-restructure",
    category: "Revenue Systems",
    tag: "Revenue Systems",
    title: "Restructuring a Service Menu That Was Quietly Losing Money",
    subtitle:
      "How a design studio rebuilt its pricing and packaging to reflect the true cost of delivery.",
    clientType: "Independent design studio, owner plus two associates.",
    challenge:
      "The studio's published service menu had accumulated over five years and had drifted out of alignment with delivery cost. Several flagship packages were operating at negative margin once true delivery time was accounted for.",
    metrics: [
      { label: "Average project margin uplift", value: "+34%" },
      { label: "Packages restructured", value: "6" },
      { label: "Pricing tier change", value: "+22%" },
      { label: "Client retention", value: "100%" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Average project margin improved by thirty four percent. Pricing repositioned upward by twenty two percent on average without losing any active client.",
    label: CONCEPT_LABEL,
  },
  {
    id: "discovery-call-conversion",
    category: "Revenue Systems",
    tag: "Revenue Systems",
    title: "Doubling Discovery Call Conversion Without Changing the Offer",
    subtitle:
      "How a fractional CMO rebuilt the structure of the sales conversation and lifted close rate from twenty to fifty percent.",
    clientType: "Fractional CMO, retainer based, mid market clients.",
    challenge:
      "Inbound discovery calls were converting at approximately twenty percent. The offer was strong but the conversation that sold it was unstructured and produced inconsistent outcomes.",
    metrics: [
      { label: "Discovery call conversion", value: "20% → 50%" },
      { label: "Average deal size uplift", value: "+18%" },
      { label: "New retainers in 90 days", value: "4" },
      { label: "Sales conversation length", value: "45 min" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Discovery call conversion lifted from twenty to fifty percent within ninety days. Four new retainer clients secured without any change to the underlying offer.",
    label: CONCEPT_LABEL,
  },
  {
    id: "retainer-expansion",
    category: "Revenue Systems",
    tag: "Revenue Systems",
    title: "Expanding Retainers Without Asking for a Price Increase",
    subtitle:
      "How a consulting practice grew average retainer value through scope architecture rather than discount removal.",
    clientType: "Strategy consulting practice, six active retainer clients.",
    challenge:
      "Retainer values had been stable for two years and the practice was reluctant to raise prices for fear of triggering churn. Margin compression was beginning to show in the income statement.",
    metrics: [
      { label: "Average retainer uplift", value: "+41%" },
      { label: "Clients expanded", value: "5 of 6" },
      { label: "Churn during repricing", value: "0" },
      { label: "Time to full rollout", value: "120 days" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Five of six retainer clients accepted scope expansions averaging forty one percent uplift in monthly value, with zero churn during the repricing window.",
    label: CONCEPT_LABEL,
  },
  {
    id: "positioning-rebuild",
    category: "Growth Strategy",
    tag: "Growth Strategy",
    title: "Rebuilding a Practice Around a Single Defensible Position",
    subtitle:
      "How a generalist consultancy narrowed its market and tripled inbound qualification within six months.",
    clientType: "Generalist management consultancy, two partners.",
    challenge:
      "The practice served too broad a range of clients and was losing positioning ground to specialist firms in every vertical it competed in. Inbound was thinning and referrals were drifting toward competitors.",
    metrics: [
      { label: "Inbound qualification rate", value: "3×" },
      { label: "Average deal size", value: "+47%" },
      { label: "Sales cycle reduction", value: "−28%" },
      { label: "Verticals served", value: "5 → 1" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Inbound qualification rate tripled within six months of repositioning. Average deal size grew forty seven percent and sales cycle compressed by twenty eight percent.",
    label: CONCEPT_LABEL,
  },
  {
    id: "category-creation",
    category: "Growth Strategy",
    tag: "Growth Strategy",
    title: "Naming a Category to Own a Conversation",
    subtitle:
      "How a niche advisory firm built a category around its methodology and became the default reference point for buyers.",
    clientType: "Niche advisory firm, three partners, specialist B2B.",
    challenge:
      "The methodology the firm had developed was strong but unnamed. Prospects struggled to describe what the firm did, which produced soft referrals and weak word of mouth.",
    metrics: [
      { label: "Branded search uplift", value: "8×" },
      { label: "Inbound from category term", value: "47%" },
      { label: "Speaking invitations", value: "12" },
      { label: "Time to category recognition", value: "9 months" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Branded search lifted eightfold. Forty seven percent of new inbound now arrives via the category term the firm authored.",
    label: CONCEPT_LABEL,
  },
  {
    id: "referral-engineering",
    category: "Growth Strategy",
    tag: "Growth Strategy",
    title: "Engineering a Referral Channel That Did Not Previously Exist",
    subtitle:
      "How a professional services firm built a structured referral programme without offering financial incentives.",
    clientType: "Professional services firm, partner led, mid market focus.",
    challenge:
      "Referrals arrived irregularly and could not be forecast. The firm had no structured way to ask for them and no mechanism to thank or credit referrers.",
    metrics: [
      { label: "Referral volume uplift", value: "5×" },
      { label: "Conversion of referrals", value: "62%" },
      { label: "Active referrer base", value: "34" },
      { label: "Cost of programme", value: "$0 incentives" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Referral volume lifted fivefold within twelve months. Conversion rate of referrals held above sixty percent across the period.",
    label: CONCEPT_LABEL,
  },
  {
    id: "ops-automation-agency",
    category: "AI Automation & Systems",
    tag: "AI Automation & Systems",
    title: "Removing Twenty Hours of Weekly Drag from a Five Person Agency",
    subtitle:
      "How a small agency consolidated its tool stack and automated the operational layer that was quietly consuming the team.",
    clientType: "Five person digital agency, retainer and project mix.",
    challenge:
      "Operational tasks were spread across nine tools with no consolidated visibility. Status updates, internal reporting, and client communication consumed approximately twenty hours per week across the team.",
    metrics: [
      { label: "Weekly hours recovered", value: "20" },
      { label: "Tools consolidated", value: "9 → 4" },
      { label: "Status meeting time", value: "−65%" },
      { label: "Client visibility uplift", value: "Real time" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Twenty hours per week recovered across the team. Tool stack consolidated from nine to four, with real time client visibility into project status.",
    label: CONCEPT_LABEL,
  },
  {
    id: "ai-content-engine",
    category: "AI Automation & Systems",
    tag: "AI Automation & Systems",
    title: "Building an AI Assisted Content Engine That a Human Still Owns",
    subtitle:
      "How a thought leadership practice scaled its publishing cadence without losing the voice that made the work credible.",
    clientType: "Thought leadership practice, single principal.",
    challenge:
      "The principal could produce strong long form content but only at a cadence of one piece per month, which was too slow to build the public footprint the practice needed.",
    metrics: [
      { label: "Publishing cadence uplift", value: "4×" },
      { label: "Editorial review time", value: "−60%" },
      { label: "Engagement uplift", value: "+180%" },
      { label: "Voice consistency rating", value: "9.2/10" },
    ],
    sections: [
      { heading: "Context", body: ["Pending."] },
      { heading: "Diagnosis", body: ["Pending."] },
      { heading: "Strategy", body: ["Pending."] },
      { heading: "Build", body: ["Pending."] },
      { heading: "Activation", body: ["Pending."] },
      { heading: "Outcome", body: ["Pending."] },
      { heading: "Reflection", body: ["Pending."] },
    ],
    result:
      "Publishing cadence quadrupled while editorial review time dropped sixty percent. Engagement uplift of one hundred and eighty percent across six months.",
    label: CONCEPT_LABEL,
  },
];

export const caseStudyCategories = [
  "B2B Lead Generation",
  "Revenue Systems",
  "Growth Strategy",
  "AI Automation & Systems",
] as const;
