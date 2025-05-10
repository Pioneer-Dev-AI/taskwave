import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CardLabel, Card as CardType, List as ListType } from '../types';
import CardModal from './CardModal';
import List from './List';

interface BoardProps {
  searchKey: string;
}

const Board: React.FC<BoardProps> = ({ searchKey }) => {
  const [lists, setLists] = useState<ListType[]>([
    {
      cards: [
        {
          dateAdded: new Date('2023-03-15'),
          description: 'Create user profile page with editable fields',
          id: 'card-001',
          labels: [
            { color: '#61bd4f', id: 'label-1', name: 'Feature' },
            { color: '#eb5a46', id: 'label-4', name: 'High' },
          ],
          title: 'Implement user profile system',
        },
        {
          dateAdded: new Date('2024-08-22'),
          description: 'Build unified settings interface for the application',
          id: 'card-002',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Create and integrate settings menu',
        },
        {
          dateAdded: new Date('2022-11-03'),
          description: 'Create responsive design mockups for the landing page',
          id: 'card-003',
          labels: [{ color: '#0079bf', id: 'label-3', name: 'Design' }],
          title: 'Design landing page mockups',
        },
        {
          dateAdded: new Date('2023-06-17'),
          description: 'Implement automated testing and deployment workflow',
          id: 'card-004',
          labels: [{ color: '#61bd4f', id: 'label-1', name: 'Feature' }],
          title: 'Setup CI/CD pipeline',
        },
        {
          dateAdded: new Date('2024-02-28'),
          description:
            'Evaluate different analytics solutions for implementation',
          id: 'card-005',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Research analytics integration',
        },
        {
          dateAdded: new Date('2022-09-11'),
          description: 'Design initial database structure and relationships',
          id: 'card-006',
          labels: [{ color: '#eb5a46', id: 'label-4', name: 'High' }],
          title: 'Plan database schema',
        },
        {
          dateAdded: new Date('2023-12-04'),
          description: 'Document all API endpoints and usage examples',
          id: 'card-007',
          labels: [{ color: '#0079bf', id: 'label-6', name: 'Low' }],
          title: 'Create API documentation',
        },
      ],
      id: 'list-1',
      title: 'Ready to start',
    },
    {
      cards: [
        {
          dateAdded: new Date('2024-04-30'),
          description: 'Implement secure login and authentication system',
          id: 'card-008',
          labels: [{ color: '#eb5a46', id: 'label-2', name: 'Critical' }],
          title: 'Develop user authorization',
        },
        {
          dateAdded: new Date('2022-07-19'),
          description: 'Add internationalization and translation support',
          id: 'card-009',
          labels: [{ color: '#eb5a46', id: 'label-4', name: 'High' }],
          title: 'Multi-language support',
        },
        {
          dateAdded: new Date('2023-10-25'),
          description: 'Add global search with filters and sorting',
          id: 'card-010',
          labels: [{ color: '#61bd4f', id: 'label-1', name: 'Feature' }],
          title: 'Implement search functionality',
        },
        {
          dateAdded: new Date('2024-01-08'),
          description: 'Implement lazy loading and image compression',
          id: 'card-011',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Optimize image loading',
        },
        {
          dateAdded: new Date('2022-05-14'),
          description: 'Setup automated email notification system',
          id: 'card-012',
          labels: [{ color: '#eb5a46', id: 'label-4', name: 'High' }],
          title: 'Add email notifications',
        },
        {
          dateAdded: new Date('2023-08-31'),
          description: 'Add secure file upload with progress tracking',
          id: 'card-013',
          labels: [{ color: '#61bd4f', id: 'label-1', name: 'Feature' }],
          title: 'Implement file upload',
        },
        {
          dateAdded: new Date('2024-11-27'),
          description: 'Build customizable user dashboard interface',
          id: 'card-014',
          labels: [{ color: '#0079bf', id: 'label-3', name: 'Design' }],
          title: 'Create user dashboard',
        },
      ],
      id: 'list-2',
      title: 'In progress',
    },
    {
      cards: [
        {
          dateAdded: new Date('2022-12-16'),
          description: 'Test the new user onboarding flow',
          id: 'card-015',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'QA test - onboarding for new users',
        },
        {
          dateAdded: new Date('2023-04-02'),
          description: 'Test encryption and security measures',
          id: 'card-016',
          labels: [{ color: '#eb5a46', id: 'label-2', name: 'Critical' }],
          title: 'Validate security protocols',
        },
        {
          dateAdded: new Date('2024-07-11'),
          description: 'Test payment gateway implementation',
          id: 'card-017',
          labels: [{ color: '#eb5a46', id: 'label-2', name: 'Critical' }],
          title: 'Review payment integration',
        },
        {
          dateAdded: new Date('2022-03-28'),
          description: 'Test application on various mobile devices',
          id: 'card-018',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Check mobile responsiveness',
        },
        {
          dateAdded: new Date('2023-09-05'),
          description: 'Test all form validations and submissions',
          id: 'card-019',
          labels: [{ color: '#eb5a46', id: 'label-4', name: 'High' }],
          title: 'Validate form submissions',
        },
        {
          dateAdded: new Date('2024-05-20'),
          description: 'Test all API endpoints for correctness',
          id: 'card-020',
          labels: [{ color: '#61bd4f', id: 'label-1', name: 'Feature' }],
          title: 'Review API endpoints',
        },
        {
          dateAdded: new Date('2022-10-09'),
          description: 'Review error messages and recovery flows',
          id: 'card-021',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Check error handling',
        },
      ],
      id: 'list-3',
      title: 'Waiting for review',
    },
    {
      cards: [
        {
          dateAdded: new Date('2023-01-23'),
          description: 'Resolve audio issues when multiple users are active',
          id: 'card-022',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Fix sound effects in co-op mode',
        },
        {
          dateAdded: new Date('2024-06-14'),
          description: 'Add dark theme option for better night visibility',
          id: 'card-023',
          labels: [{ color: '#0079bf', id: 'label-6', name: 'Low' }],
          title: 'Implement dark mode interface',
        },
        {
          dateAdded: new Date('2022-08-07'),
          description: 'Configure development tools and dependencies',
          id: 'card-024',
          labels: [{ color: '#0079bf', id: 'label-6', name: 'Low' }],
          title: 'Setup development environment',
        },
        {
          dateAdded: new Date('2023-11-30'),
          description: 'Write initial project setup and guidelines',
          id: 'card-025',
          labels: [{ color: '#f2d600', id: 'label-5', name: 'Medium' }],
          title: 'Create project documentation',
        },
        {
          dateAdded: new Date('2024-03-18'),
          description: 'Implement application-wide logging solution',
          id: 'card-026',
          labels: [{ color: '#61bd4f', id: 'label-1', name: 'Feature' }],
          title: 'Setup logging system',
        },
        {
          dateAdded: new Date('2022-04-25'),
          description: 'Setup HTTPS and SSL security',
          id: 'card-027',
          labels: [{ color: '#eb5a46', id: 'label-2', name: 'Critical' }],
          title: 'Configure SSL certificates',
        },
        {
          dateAdded: new Date('2023-07-01'),
          description: 'Setup version control and initial commit',
          id: 'card-028',
          labels: [{ color: '#0079bf', id: 'label-6', name: 'Low' }],
          title: 'Initialize git repository',
        },
      ],
      id: 'list-4',
      title: 'Done',
    },
  ]);

  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const [activeListName, setActiveListName] = useState<string>('');
  const [listID, setListID] = useState<null | string>(null);

  const handleAddList = () => {
    if (newListTitle.trim()) {
      const newList: ListType = {
        cards: [],
        id: `list-${Date.now()}`,
        title: newListTitle.trim(),
      };
      setLists([...lists, newList]);
      setNewListTitle('');
    }
    setIsAddingList(false);
  };

  const handleAddCard = (listId: string, title: string) => {
    const newCard: CardType = {
      dateAdded: new Date(),
      description: '',
      id: `card-${Date.now()}`,
      labels: [],
      title,
    };

    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, cards: [...list.cards, newCard] }
          : list,
      ),
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'list') {
      const reordered = Array.from(lists);
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      setLists(reordered);
      return;
    }

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);

    if (!sourceList || !destList) return;

    if (source.droppableId === destination.droppableId) {
      const newCards = Array.from(sourceList.cards);
      const [movedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, movedCard);

      const newLists = lists.map((list) =>
        list.id === sourceList.id ? { ...list, cards: newCards } : list,
      );

      setLists(newLists);
    } else {
      const sourceCards = Array.from(sourceList.cards);
      const [movedCard] = sourceCards.splice(source.index, 1);
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, movedCard);

      const newLists = lists.map((list) => {
        if (list.id === source.droppableId) {
          return { ...list, cards: sourceCards };
        }
        if (list.id === destination.droppableId) {
          return { ...list, cards: destCards };
        }
        return list;
      });

      setLists(newLists);
    }
  };

  const handleCardClick = (card: CardType) => {
    const list = lists.find((list) => list.cards.some((c) => c.id === card.id));
    if (list) {
      setActiveCard(card);
      setActiveListName(list.title);
      setListID(list.id);
    }
  };

  const handleUpdateCard = (updatedCard: CardType) => {
    setLists(
      lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card,
        ),
      })),
    );
    setActiveCard(updatedCard);
  };

  const handleCreateLabel = (name: string, color: string): CardLabel => {
    return { color, id: uuidv4(), name };
  };

  const handleEditListTitle = (listId: string, newTitle: string) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list,
      ),
    );
    if (activeCard && activeListName) {
      const list = lists.find((list) => list.id === listId);
      if (list && list.cards.some((card) => card.id === activeCard.id)) {
        setActiveListName(newTitle);
      }
    }
  };

  const handleRemoveList = (listId: string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const handleSortByTitle = (listId: string, updatedCards: CardType[]) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, cards: updatedCards } : list,
      ),
    );
  };

  const handleSortByDate = (listId: string, updatedCards: CardType[]) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, cards: updatedCards } : list,
      ),
    );
  };

  useEffect(() => {
    console.log('Updated lists:', lists);
  }, [lists]);

  const filteredLists = React.useMemo(() => {
    const searchKeyLowercase = searchKey.toLocaleLowerCase();

    return lists.map((ii) => ({
      ...ii,
      cards: ii.cards.filter((card) =>
        card.title.toLocaleLowerCase().includes(searchKeyLowercase),
      ),
    }));
  }, [lists, searchKey]);

  return (
    <div className="flex-1 overflow-x-auto px-6 pb-6 mr-5">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable direction="horizontal" droppableId="board" type="list">
          {(provided) => (
            <div
              className="flex h-full space-x-1"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredLists.map((list, index) => (
                <Draggable draggableId={list.id} index={index} key={list.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <List
                        list={list}
                        onAddCard={handleAddCard}
                        onCardClick={handleCardClick}
                        onEditListTitle={handleEditListTitle}
                        onRemoveList={handleRemoveList}
                        onSortByDate={handleSortByDate}
                        onSortByTitle={handleSortByTitle}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {!searchKey.trim() &&
                (isAddingList ? (
                  <div className="w-72 flex-shrink-0 p-2 bg-[#323244] rounded overflow-hidden">
                    <input
                      autoFocus
                      className="w-full px-2 py-1 rounded bg-[#3b3b4d] text-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      onChange={(e) => setNewListTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddList();
                        } else if (e.key === 'Escape') {
                          setIsAddingList(false);
                          setNewListTitle('');
                        }
                      }}
                      placeholder="Enter list title..."
                      type="text"
                      value={newListTitle}
                    />
                    <div className="flex">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm"
                        onClick={handleAddList}
                      >
                        Add list
                      </button>
                      <button
                        className="text-gray-300 hover:text-white px-2 py-1 text-sm"
                        onClick={() => {
                          setIsAddingList(false);
                          setNewListTitle('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="flex min-w-[200px] items-center justify-center w-72 h-10 bg-[#323244] text-white rounded px-4 py-2 hover:bg-[#3b3b4d]"
                    onClick={() => setIsAddingList(true)}
                  >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    <span>Add another list</span>
                  </button>
                ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {activeCard && (
        <CardModal
          card={activeCard}
          listID={listID}
          listName={activeListName}
          onClose={() => setActiveCard(null)}
          onCreateLabel={handleCreateLabel}
          onUpdateCard={handleUpdateCard}
          setLists={setLists}
        />
      )}
    </div>
  );
};

export default Board;
