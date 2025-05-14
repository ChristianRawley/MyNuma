import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, TextInput, ScrollView, Alert } from 'react-native';

async function makeGetRequest(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

const CustomModal = ({ visible, title, data, onSelect, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TextInput style={styles.searchInput} placeholder="Search..." value={searchText} onChangeText={setSearchText} />
          <FlatList
            style={{ width: '100%' }}
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem} onPress={() => { onSelect(item.id, item.name); onClose(); }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const SectionButton = ({ title, data, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.searchButton} onPress={() => setModalVisible(true)}>
        <Text>{title}</Text>
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        title={title}
        data={data}
        onSelect={(id, name) => { onSelect(id, name); setModalVisible(false); }}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default function Tab() {
  const [terms, setTerms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedTermName, setSelectedTermName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedStatusName, setSelectedStatusName] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState('');
  const [courses, setCourses] = useState([]);

  const statuses = [
    { id: '%', name: 'Any Status' },
    { id: 'X', name: 'Canceled' },
    { id: 'C', name: 'Closed' },
    { id: 'P', name: 'Completed' },
    { id: 'I', name: 'In Progress' },
    { id: 'O', name: 'Open' },
    { id: 'R', name: 'Restricted' },
    { id: 'W', name: 'Waitlisted' },
  ];

  const sections = [
    { id: '%', name: 'Any Section' },
    { id: '%E', name: 'Full-online' },
    { id: '%Y', name: 'Hybrid' },
    { id: '%D', name: 'Web-enhanced' },
    { id: '%G', name: '8 Week' },
    { id: '%S', name: 'Weekend' },
    { id: '0', name: 'Day' },
    { id: '9', name: 'Night' },
    { id: '%A', name: 'Independent Study' },
    { id: '%B', name: 'Block' },
    { id: '%H', name: 'Honors' },
    { id: '%Z', name: 'Intersession/Maymester/Special' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const termResponse = await makeGetRequest('https://mynumaserver-production.up.railway.app/getTerms');
        const subjectResponse = await makeGetRequest('https://mynumaserver-production.up.railway.app/getSubjects');
        
        const parsedTerms = JSON.parse(termResponse);
        const parsedSubjects = JSON.parse(subjectResponse);

        setTerms(parsedTerms);
        setSubjects(parsedSubjects);

        if (parsedTerms.length > 0 && !selectedTerm) {
          setSelectedTerm(parsedTerms[0].id);
          setSelectedTermName(parsedTerms[0].name);
        }
        if (parsedSubjects.length > 0 && !selectedSubject) {
          setSelectedSubject(parsedSubjects[0].id);
          setSelectedSubjectName(parsedSubjects[0].name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedStatus && statuses.length > 0) {
      setSelectedStatus(statuses[0].id);
      setSelectedStatusName(statuses[0].name);
    }
    if (!selectedSection && sections.length > 0) {
      setSelectedSection(sections[0].id);
      setSelectedSectionName(sections[0].name);
    }
  }, [statuses, sections]);

  const handleButtonPress = async () => {
    try {
      const url = `https://mynumaserver-production.up.railway.app/getCourses?subject=${selectedSubject}&term=${selectedTerm}&status=${selectedStatus}&section=${selectedSection}`;
      const response = await makeGetRequest(url);
      const coursesData = JSON.parse(response);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.search}>
        <Text style={styles.linkText}>Search courses</Text>
        <SectionButton title={selectedTermName || "Select term"} data={terms} onSelect={(id, name) => { setSelectedTerm(id); setSelectedTermName(name); }} />
        <SectionButton title={selectedSubjectName || "Select subject"} data={subjects} onSelect={(id, name) => { setSelectedSubject(id); setSelectedSubjectName(name); }} />
        <SectionButton title={selectedStatusName || "Select status"} data={statuses} onSelect={(id, name) => { setSelectedStatus(id); setSelectedStatusName(name); }} />
        <SectionButton title={selectedSectionName || "Select section"} data={sections} onSelect={(id, name) => { setSelectedSection(id); setSelectedSectionName(name); }} />
        <TouchableOpacity onPress={handleButtonPress} style={{ width: '100%' }}>
          <View style={styles.searchEnter}>
            <Text style={styles.searchEnterText}>Search classes</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ width: '100%' }}
        data={courses}
        scrollEnabled={false}
        keyExtractor={(item) => item.crn}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
              <View style={{backgroundColor: '#ddd', borderWidth: 1, borderColor: '#bbb', borderRadius: 4, paddingHorizontal: 4, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{fontSize: 12}}>{item.subject} {item.crsNum}</Text>
              </View>
              <Text style={styles.courseTitle}> {item.title}</Text>
            </View>
            <Text style={styles.courseInfo}>
              <Text style={styles.courseLabel}>Status:</Text> {item.status} | <Text style={styles.courseLabel}></Text>{item.act}/{item.cap} seats taken
            </Text>
            <Text style={styles.courseInfo}><Text style={styles.courseLabel}>Meeting Time:</Text> {item.meetingTime} </Text>
            <Text style={styles.courseInfo}>
              <Text style={styles.courseLabel}>Location:</Text> {item.location}
            </Text>
            <Text style={styles.courseInfo}>
              <Text style={styles.courseLabel}>Instructor:</Text> {item.instructor}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  search: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
  },
  searchButton: {
    width: '100%',
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#eee',
  },
  searchEnter: {
    width: '100%',
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#002856',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
  },
  searchEnterText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    marginBottom: 10,
  },
  listItem: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyText: {
    color: '#555',
    fontStyle: 'italic',
    marginTop: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#002856',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: '500',
  },

  courseItem: {
    width: '100%',
    padding: 12,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
  },
  courseInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  courseLabel: {
    fontWeight: '500',
    color: '#002856',
  },
});
