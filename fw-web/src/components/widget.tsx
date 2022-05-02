import { ChatTeardropDots } from 'phosphor-react';
import { FC } from 'react';
import { Popover } from '@headlessui/react';

export const Widget: FC = () => {
    return (
        <Popover className="absolute bottom-5 right-5">
            <Popover.Button className="bg-brand-500 rounded-full h-12 px-3 text-white flex items-center group">
                {<ChatTeardropDots className="w-6 h-6" />}

                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                    <span className="pl-2">Feedback</span>
                </span>
            </Popover.Button>
        </Popover>
    );
};
