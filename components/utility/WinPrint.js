import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {

const print = () => {
    window.print();
    };

return (<>
    <style type="text/css" media="print">
    {`
      @page 
      {
          size:  auto;   /* auto is the initial value */
          margin: 0mm;  /* this affects the margin in the printer settings */
      }

      html
      {
          background-color: #FFFFFF; 
          margin: 48px;  /* this affects the margin on the html before sending to printer */
      }

    `}
    </style>
    <button
        aria-label="Download Resume"
        className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-zinc-800 shadow-lg border-2 border-white"
        onClick={print}
      >
       <MdPictureAsPdf className="w-10 h-10" title="Download Resume"/>
      </button></>
    );
};

export default WinPrint;
