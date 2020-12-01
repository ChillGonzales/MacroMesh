"use strict";
import { Food } from "./main.js";

let eggs = new Food("Eggs", "egg(s)", 1, 6, 5, 1, 6);
let chicken = new Food("Chicken", "oz", 0, 9, 1, 1, 24);
let beef8020 = new Food("80/20 Ground Beef", "oz", 0, 7, 5, 1, 24);
let beef9010 = new Food("90/10 Ground Beef", "oz", 0, 8, 3, 1, 24);
let cheese = new Food("Cheese", "oz", 0, 7, 9, 1, 8);
let turkey = new Food("Ground Turkey", "oz", 0, 7, 5, 1, 24);
let broccoli = new Food("Broccoli", "oz", 2, 1, 0, 1, 24);
let greenBeans = new Food("Green Beans", "oz", 2, 1, 0, 1, 24);
let carrots = new Food("Carrots", "oz", 3, 0, 0, 1, 24);
let spinach = new Food("Spinach", 1, 1, 0, 1, 24);
let bellPepper = new Food("Bell Pepper", 1, 1, 0, 1, 24);
let rice = new Food("Rice", "oz", 8, 1, 0, 1, 16);

export function getFoods() {
  return [
    eggs,
    chicken,
    beef8020,
    beef9010,
    cheese,
    turkey,
    broccoli,
    greenBeans,
    carrots,
    spinach,
    bellPepper,
    rice
  ];
}