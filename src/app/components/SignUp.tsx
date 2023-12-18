"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

interface SignUpProps {
  popupAction: boolean;
  onCloseModal: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ popupAction, onCloseModal }) => {
  const [email, setEmail] = useState("");

  return (
    <Modal
      className=" z-50"
      show={popupAction}
      size="5xl"
      onClose={onCloseModal}
      popup
    >
      <Modal.Header className=" z-10" />
      <Modal.Body>
        <div className="space-y-6 flex flex-col justify-center relative z-20">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white text-center py-7">
            Sign up for our beta software today.
          </h3>

          <div className=" w-full md:w-10/12 flex lg:w-6/12 gap-x-5 mx-auto pt-12 pb-16 ">
            <div className=" w-full">
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="inline-flex">
              <Button color="dark">Submit</Button>
            </div>
          </div>
        </div>

        <svg
          className="absolute inset-0 w-full h-full z-0"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1463 360"
          data-v-77b1cd82=""
        >
          <path
            className=" text-gray-500/5"
            fill="currentColor"
            d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
            data-v-77b1cd82=""
          ></path>
          <path
            className="text-gray-500/10"
            fill="currentColor"
            d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
            data-v-77b1cd82=""
          ></path>
        </svg>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
