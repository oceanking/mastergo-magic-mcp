import fs from "fs";
import path from "path";

function getArgs(): string[] {
  return process.argv.slice(2);
}

function parseToken(): string {
  const args = getArgs();
  let token = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--token" && i + 1 < args.length) {
      token = args[i + 1];
      break;
    } else if (args[i].startsWith("--token=")) {
      token = args[i].split("=")[1];
      break;
    }
  }

  return token;
}

function parseCookiePath(): string {
  const args = getArgs();
  let token = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--cookiepath" && i + 1 < args.length) {
      token = args[i + 1];
      break;
    } else if (args[i].startsWith("--cookiepath=")) {
      token = args[i].split("=")[1];
      break;
    }
  }

  return token;
}

function parseCookie(): string {
  // 首先检查命令行参数
  const args = getArgs();
  let cookie = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--cookie" && i + 1 < args.length) {
      cookie = args[i + 1];
      break;
    } else if (args[i].startsWith("--cookie=")) {
      cookie = args[i].split("=")[1];
      break;
    }
  }

  // 如果命令行参数没有提供cookie，则尝试从文件读取
  if (!cookie) {
    try {
      // 查找项目根目录下的.ipscookie.local文件
      // const projectPath = '/Users/oceanking/Desktop/code' as string;
      const cookiePath = parseCookiePath();
      // const cookieFilePath = path.join(cookiePath, "ipscookie.txt");
      if (fs.existsSync(cookiePath)) {
        cookie = fs.readFileSync(cookiePath, "utf8").trim();
      }
    } catch (error) {
      // 如果读取文件失败，保持cookie为空
      console.warn("Warning: Failed to read .ipscookie.local file:", error);
    }
  }

  return cookie;
}

function parseUrl(): string {
  const args = getArgs();
  let baseUrl = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--url" && i + 1 < args.length) {
      baseUrl = args[i + 1];
      break;
    } else if (args[i].startsWith("--url=")) {
      baseUrl = args[i].split("=")[1];
      break;
    }
  }

  return baseUrl;
}

function parseRules(): string[] {
  const args = getArgs();
  const rules: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--rule" && i + 1 < args.length) {
      rules.push(args[i + 1]);
    } else if (args[i].startsWith("--rule=")) {
      rules.push(args[i].split("=")[1]);
    }
  }

  return rules;
}

function parseDebug(): boolean {
  const args = getArgs();

  for (const arg of args) {
    if (arg === "--debug") {
      return true;
    }
  }

  return false;
}

function parseNoRule(): boolean {
  const args = getArgs();

  for (const arg of args) {
    if (arg === "--no-rule") {
      return true;
    }
  }

  return false;
}

const cookie = parseCookie();
console.log('cookie:', cookie)

export function parserArgs(): {
  token: string;
  baseUrl: string;
  rules: string[];
  cookie: string;
  debug: boolean;
  noRule: boolean;
} {
  const token = parseToken();
  const baseUrl = parseUrl();
  const rules = parseRules();
  const debug = parseDebug();
  const noRule = parseNoRule();
  const cookie = parseCookie();


  return {
    token,
    baseUrl,
    rules,
    debug,
    noRule,
    cookie,
  };
}

export { parseToken, parseUrl, parseRules, parseDebug, parseNoRule, getArgs, parseCookie };
