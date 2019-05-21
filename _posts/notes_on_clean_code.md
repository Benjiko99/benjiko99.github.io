# Notes on Clean Code

In these days of Scrum and Agile, the focus is on quickly bringing product to market. We want the factory running at top speed to produce software. These are human factories: thinking, feeling coders who are working from a product backlog or user story to create product. The manufacturing metaphor looms ever strong in such thinking. The production aspects of Japanese auto manufacturing, of an assembly-line world, inspire much of Scrum.

Yet even in the auto industry, the bulk of the work lies not in manufacturing but in maintenance—or its avoidance. In software, 80% or more of what we do is quaintly called "maintenance": the act of repair. Rather than embracing the typical Western focus on producing good software, we should be thinking more like home repairmen in the building industry, or auto mechanics in the automotive field. What does Japanese management have to say about that?

In about 1951, a quality approach called Total Productive Maintenance (TPM) came on the Japanese scene. Its focus is on maintenance rather than on production. One of the major pillars of TPM is the set of so-called 5S principles. 5S is a set of disciplines. These 5S principles are in fact at the foundations of Lean. These principles are not an option, good software practice requires such discipline: focus, presence of mind, and thinking. it is not always just about doing, about pushing the factory equipment to produce at the optimal velocity. The 5S philosophy comprises these concepts:

- *Seiri*, or organization (think "sort" in English). Knowing where things are--using approaches such as suitable naming--is crucial.

- *Seiton*, or tidiness (think "systematize" in English). There is an old American saying: A place for everything, and everything in its place. A piece of code should be where you expect to find it--and, if not, you should re-factor to get it there.

- *Seiso*, or cleaning (think "shine" in English): Keep the workplace free of hanging wires, grease, scraps, and waste.

- *Seiketsu*, or standardization: The group agrees about how to keep the workplace clean.

- *Shutsuke*, or discipline (self-discipline). This means having the discipline to follow the practices and to frequently reflect on one's work and be willing to change.

Refactor mercilessly, build machines that are more maintainable in the first place. Making your code readable is as important as making it executable.