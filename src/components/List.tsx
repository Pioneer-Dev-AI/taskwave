import { Droppable } from '@hello-pangea/dnd';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useRef, useState } from 'react';

import { Card as CardType, List as ListType } from '../types';
import Card from './Card';

interface ListProps {
  list: ListType;
  onAddCard: (listId: string, title: string) => void;
  onCardClick: (card: CardType) => void;
  onEditListTitle: (listId: string, newTitle: string) => void;
  onRemoveList: (listId: string) => void;
  onSortByDate: (listId: string, updatedCards: CardType[]) => void;
  onSortByTitle: (listId: string, updatedCards: CardType[]) => void;
}

const List: React.FC<ListProps> = ({
  list,
  onAddCard,
  onCardClick,
  onEditListTitle,
  onRemoveList,
  onSortByDate,
  onSortByTitle,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sortMode, setSortMode] = useState<'ASC' | 'DESC' | null>(null);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(list.id, newCardTitle.trim());
      setNewCardTitle('');
    }
    setIsAddingCard(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCard();
    } else if (e.key === 'Escape') {
      setIsAddingCard(false);
      setNewCardTitle('');
    }
  };

  const handleTitleEdit = () => {
    if (listTitle.trim() && listTitle !== list.title) {
      onEditListTitle(list.id, listTitle.trim());
    } else {
      setListTitle(list.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleEdit();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setListTitle(list.title);
    }
  };

  const getColumnColor = () => {
    switch (list.title.toLowerCase()) {
      case 'done':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-yellow-500';
      case 'ready to start':
      case 'to do':
        return 'bg-purple-600';
      case 'review':
      case 'waiting for review':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleRemoveList = () => {
    onRemoveList(list.id);
  };

  const handleSortByTitle = () => {
    if (sortMode === 'DESC') {
      onSortByTitle(
        list.id,
        list.cards.sort((a, b) => b.title.localeCompare(a.title)),
      );

      setSortMode("ASC")
    } else {
      onSortByTitle(
        list.id,
        list.cards.sort((a, b) => a.title.localeCompare(b.title)),
      );

      setSortMode("DESC")
    }
  };

  const handleSortByDate = () => {
    if (sortMode === 'DESC') {
      onSortByDate(
        list.id,
        list.cards.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()),
      );

      setSortMode("ASC")
    } else {
      onSortByDate(
        list.id,
        list.cards.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime()),
      );

      setSortMode("DESC")
    }
  };

  return (
    <div className="w-72 flex-shrink-0 max-h-full flex flex-col mr-4 rounded overflow-hidden shadow-md">
      <div
        className={`p-2 ${getColumnColor()} text-white flex justify-between`}
      >
        {isEditingTitle ? (
          <input
            autoFocus
            className="w-full px-2 py-1 rounded border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            onBlur={handleTitleEdit}
            onChange={(e) => setListTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            type="text"
            value={listTitle}
          />
        ) : (
          <h2
            className="font-medium text-sm px-2 py-1 cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </h2>
        )}

        <div className="relative" ref={menuRef}>
          <div
            onClick={toggleMenu}
            style={{ background: 'transparent', border: 0, padding: 0 }}
          >
            <EllipsisVerticalIcon className="h-full w-5 hover:w-7 cursor-pointer" />
          </div>

          {isMenuOpen && (
            <div className="font-sans text-xs absolute right-0.5 mt-2 bg-[#4d4d69] shadow-lg rounded-md p-2 w-40">
              <ul>
                <li
                  className="py-2 px-4 rounded cursor-pointer hover:bg-[#8d80d6]"
                  onClick={() => setShowConfirmModal(true)}
                >
                  Remove this list
                </li>
                <li
                  className="py-2 px-4 rounded cursor-pointer hover:bg-[#8d80d6]"
                  onClick={handleSortByTitle}
                >
                  Sort by title (Ascending and Descending)
                </li>
                <li className="py-2 px-4 rounded cursor-pointer hover:bg-[#8d80d6]"
                  onClick={handleSortByDate}
                >
                  Sort by date (Ascending and Descending)
                </li>
              </ul>
            </div>
          )}
        </div>

        {showConfirmModal && (
          <div className="fixed inset-0 bg-transparent bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2c2c3d] rounded-lg shadow-xl w-full max-w-sm p-4 text-white">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="text-sm text-gray-300 mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-red-600 px-4 py-2 rounded text-sm"
                  onClick={handleRemoveList}
                >
                  Remove
                </button>
                <button
                  className="bg-gray-600 px-4 py-2 rounded text-sm"
                  onClick={() => setShowConfirmModal(false)} // Close modal
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            className="flex-1 overflow-x-hidden overflow-y-auto bg-[#323244] p-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards.map((card, index) => (
              <Card
                card={card}
                index={index}
                key={card.id}
                onClick={onCardClick}
              />
            ))}
            {provided.placeholder}

            {isAddingCard ? (
              <div className="p-2">
                <textarea
                  autoFocus
                  className="w-full p-2 rounded bg-[#3b3b4d] text-white border-0 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter a title for this card..."
                  value={newCardTitle}
                />
                <div className="flex mt-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm"
                    onClick={handleAddCard}
                  >
                    Add card
                  </button>
                  <button
                    className="text-gray-300 hover:text-white px-2 py-1 text-sm"
                    onClick={() => {
                      setIsAddingCard(false);
                      setNewCardTitle('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="flex items-center text-gray-400 hover:text-white w-full p-2 hover:bg-[#3b3b4d]"
                onClick={() => setIsAddingCard(true)}
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                <span>Add a card</span>
              </button>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
