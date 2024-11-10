import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { ResponsiveLine } from '@nivo/line';
import { format } from 'date-fns';

function UserProfile() {
  const [displayName, setDisplayName] = useState('');
  const [userNovels, setUserNovels] = useState([]);
  const [viewsData, setViewsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          // Fetch user profile
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setDisplayName(userDoc.data().displayName || '');
          }

          // Fetch user's novels
          const novelsQuery = query(
            collection(db, 'Novels'),
            where('Uploadby', '==', auth.currentUser.uid)
          );
          const novelsSnapshot = await getDocs(novelsQuery);
          const novels = novelsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUserNovels(novels);

          // Generate views data for chart
          const viewsOverTime = novels.map(novel => ({
            id: novel.title,
            data: generateViewsData(novel.Views || 0)
          }));
          setViewsData(viewsOverTime);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const generateViewsData = (totalViews) => {
    // Generate mock data points for the last 30 days
    const data = [];
    let currentViews = 0;
    const increment = totalViews / 30;

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      currentViews += increment + (Math.random() * increment * 0.5);
      data.push({
        x: format(date, 'MM/dd'),
        y: Math.round(currentViews)
      });
    }
    return data;
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: displayName
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {isEditing ? (
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter display name"
            />
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <p className="text-xl">{displayName || 'Set your display name'}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Your Novels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userNovels.map(novel => (
            <div key={novel.id} className="border rounded-lg p-4">
              <h4 className="font-bold mb-2">{novel.title}</h4>
              <p>Views: {novel.Views?.toLocaleString() || 0}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Views Over Time</h3>
        <div style={{ height: '400px' }}>
          <ResponsiveLine
            data={viewsData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: 'Date',
              legendOffset: 36,
              legendPosition: 'middle'
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Views',
              legendOffset: -40,
              legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;