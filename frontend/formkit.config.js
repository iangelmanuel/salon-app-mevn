import { generateClasses } from "@formkit/themes"

const config = {
  config: {
    classes: generateClasses({
      global: {
        wrapper: "space-y-2 mb-3",
        label: "block mb-1 font-bold text-lg text-white",
        message:
          "text-red-500 font-semibold border-l-3 border-red-500 text-xs uppercase p-2 my-3",
        input:
          "w-full bg-white p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400"
      },
      submit: {
        input:
          "$reset bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
      }
    })
  }
}

export default config
