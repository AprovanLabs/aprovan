#!/usr/bin/env node
import { Command } from "commander";
import { bootstrap } from "./commands/bootstrap.js";

const program = new Command();
program
  .name("devtools")
  .description("Shared development utilities for Aprovan projects");

program
  .command("bootstrap")
  .description("Bootstrap repository skill symlinks and agent context dirs")
  .action(() => {
    bootstrap();
  });

program.parse();
