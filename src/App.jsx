import React from "react";
import { Button } from "@/components/ui/button";

import Head from "./components/custom/Head";
import { CarouselDemo } from "./components/custom/CarouselDemo";
const App = () => {
  return (
    <div>
      <Head />
      <div className="flex flex-col justify-center items-center my-20 mx-auto gap-20">
        <Button>Click me!</Button>
        <CarouselDemo />
      </div>
    </div>
  );
};

export default App;


