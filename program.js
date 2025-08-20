import chalk from "chalk";
import promptSync from "prompt-sync";
import { actions } from "./actions.js";
import { Graph } from './graph.js';

const graph = new Graph();

const prompt = promptSync({ sigint: true });

export default function() {

    console.log(chalk.green("Welcome to the graph program!"));

    console.log("\nAvailable actions");

    outerLoop: while (true) {
        console.log("\n");
        actions.map(({ id, label }) => {
            console.log(`${ chalk.green(id) }. ${ label }`);
        });
        console.log("");
        let choice;
        do {
            choice = prompt(chalk.bgYellowBright(" Choose one of these actions (write the action number):") + " ");
        } while (isNaN(choice))
        
        choice = Number(choice);

        switch (choice) {
            case 1: {
                const u = prompt("Enter first vertex: ");
                const v = prompt("Enter second vertex: ");
                const w = Number(prompt("Enter weight between vertexes: "));
                if (graph.addEdge(u, v, w)) {
                    console.log(chalk.bgGreen(` Edge between ${ u } and ${ v } with weight ${ w } added successfully. `));
                } else {
                    console.log(chalk.bgRed("Invalid parameters."));
                }
                break;
            };
            case 2: {
                console.log(chalk.bgGreen(` The graph has ${ graph.hasCycle() ? "a" : "no" } cycle. `));
                break;
            };
            case 3: {
                const u = prompt("Enter u: ");
                const v = prompt("Enter v: ");
                const res = graph.shortestPath(u, v);
                if (res === -1) {
                    console.log(chalk.bgRedBright(` There is no path between ${ u } and ${ v }. `));
                } else {
                    console.log(chalk.bgGreen(` Shortest path between ${ u } and ${ v } = ${ res }. `));
                }
                break;
            };
            case 4: {
                console.log(chalk.bgCyan(" Program exits. "));
                break outerLoop;
            };
            default: {
                console.log(chalk.bgRed(" Invalid action. "));
            }
        }
    }
}
