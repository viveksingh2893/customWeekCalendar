import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const timetableRef = useRef(null);
  const currentDate = new Date();
  const screenWidth = Dimensions.get('screen').width * 0.8;
  // const screenWidth = Dimensions.get('screen').width;
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // const previewCount = 1;
  // const itemWidth = Dimensions.get('screen').width / (previewCount + 0.5);
  // const startScroll = (itemWidth * 3) / 4;

  // const snapToOffsets = timetableData.map((x, i) => {
  //   return i * itemWidth + startScroll;
  // });

  const timetableData = [
    {
      day: 'Mon',
      sub: [
        {code: 'Math', type: '', startTime: '9:50', endTime: '10:25'},
        {code: 'SSC', type: '', startTime: '10:40', endTime: '11:50'},
        {code: 'MORNING BREAK', type: '', startTime: '11:30', endTime: '12:05'},
        {code: 'English', type: '', startTime: '12:15', endTime: '12:50'},
        {code: 'PHY', type: '', startTime: '1:00', endTime: '1:25'},
        {code: 'Lunch Break', type: '', startTime: '1:50', endTime: '2:25'},
        {code: 'Telugu', type: '', startTime: '2:30', endTime: '3:25'},
        {code: 'Dance', type: '', startTime: '3:50', endTime: '4:25'},
      ],
    },
    {
      day: 'Tue',
      sub: [
        {code: 'Dance', type: '', startTime: '9:50', endTime: '10:25'},
        {code: 'BREAK', type: '', startTime: '10:40', endTime: '11:50'},
        {code: 'SSC', type: '', startTime: '11:30', endTime: '12:05'},
        {code: 'Math', type: '', startTime: '12:15', endTime: '12:50'},
        {code: 'PHY', type: '', startTime: '1:00', endTime: '1:25'},
        {code: 'Break', type: '', startTime: '1:50', endTime: '2:25'},
        {code: 'Telugu', type: '', startTime: '2:30', endTime: '3:25'},
        {code: 'English', type: '', startTime: '3:50', endTime: '4:25'},
      ],
    },
    {
      day: 'Wed',
      sub: [
        {code: 'PHY', type: '', startTime: '9:50', endTime: '10:25'},
        {code: 'Telugu', type: '', startTime: '10:40', endTime: '11:50'},
        {code: 'Lunch BREAK', type: '', startTime: '11:30', endTime: '12:05'},
        {code: 'English', type: '', startTime: '12:15', endTime: '12:50'},
        {code: 'Math', type: '', startTime: '1:00', endTime: '1:25'},
        {code: 'SSC', type: '', startTime: '1:50', endTime: '2:25'},
        {code: 'Evening Break', type: '', startTime: '2:30', endTime: '3:25'},
        {code: 'Dance', type: '', startTime: '3:50', endTime: '4:25'},
      ],
    },
    {
      day: 'Thu',
      sub: [
        {code: 'Telugu', type: '', startTime: '9:50', endTime: '10:25'},
        {code: 'SSC', type: '', startTime: '10:40', endTime: '11:50'},
        {code: 'LUNCH BREAK', type: '', startTime: '11:30', endTime: '12:05'},
        {code: 'English', type: '', startTime: '12:15', endTime: '12:50'},
        {code: 'Math', type: '', startTime: '1:00', endTime: '1:25'},
        {code: 'Break', type: '', startTime: '1:50', endTime: '2:25'},
        {code: 'PHY', type: '', startTime: '2:30', endTime: '3:25'},
        {code: 'Dance', type: '', startTime: '3:50', endTime: '4:25'},
      ],
    },
    {
      day: 'Fri',
      sub: [
        {code: 'SSC', type: '', startTime: '9:50', endTime: '10:25'},
        {code: 'Morning BREAK', type: '', startTime: '10:40', endTime: '11:50'},
        {code: 'Math', type: '', startTime: '11:30', endTime: '12:05'},
        {code: 'Telugu', type: '', startTime: '12:15', endTime: '12:50'},
        {code: 'PHY', type: '', startTime: '1:00', endTime: '1:25'},
        {code: 'Break', type: '', startTime: '1:50', endTime: '2:25'},
        {code: 'English', type: '', startTime: '2:30', endTime: '3:25'},
        {code: 'Dance', type: '', startTime: '3:50', endTime: '4:25'},
      ],
    },
    {
      day: 'Sat',
      sub: [
        {code: 'English', type: '', startTime: '9:50', endTime: '10:25'},
        {code: 'Math', type: '', startTime: '10:40', endTime: '11:50'},
        {code: 'SSC', type: '', startTime: '11:30', endTime: '12:05'},
        {code: 'LUNCH BREAK', type: '', startTime: '12:15', endTime: '12:50'},
        {code: 'PHY', type: '', startTime: '1:00', endTime: '1:25'},
        {code: 'Telugu', type: '', startTime: '1:50', endTime: '2:25'},
        {code: 'Break', type: '', startTime: '2:30', endTime: '3:25'},
        {code: 'Dance', type: '', startTime: '3:50', endTime: '4:25'},
      ],
    },
  ];

  const daysInWeek = 7;

  const generateWeekDates = () => {
    const weekDates = [];
    const currentDay = selectedDate.getDay();

    for (let i = 0; i < daysInWeek; i++) {
      const currentDate = new Date(selectedDate);
      const daysToAdd = i - currentDay + 1;
      currentDate.setDate(selectedDate.getDate() + daysToAdd);
      weekDates.push(currentDate);
    }
    return weekDates;
  };

  const current_date = generateWeekDates().filter(str =>
    str.toISOString().includes(currentDate.toISOString().split('T')[0]),
  );

  const renderDay = ({item, index}) => (
    <View
      style={{
        alignItems: 'center',
        paddingBottom: 3,
        height: Dimensions.get('screen').height * 0.1,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        disabled={daysOfWeek[item.getDay()] === 'Sun' ? true : false}
        style={{
          ...styles.dayContainer,
          backgroundColor:
            daysOfWeek[item.getDay()] === 'Sun'
              ? '#FFB6C1'
              : selectedDayIndex === index
              ? 'blue'
              : 'lightgrey',
        }}
        onPress={() => onDayPress(index)}>
        <Text
          style={{
            fontSize: 18,
            color: selectedDayIndex === index ? 'white' : 'black',
          }}>
          {daysOfWeek[item.getDay()]}
        </Text>
        <View
          style={{
            height: Dimensions.get('screen').width * 0.05,
            width: Dimensions.get('screen').width * 0.05,
            borderRadius: Dimensions.get('screen').width * 0.025,
            backgroundColor:
              selectedDayIndex === index
                ? 'white'
                : daysOfWeek[item.getDay()] === 'Sun'
                ? '#FFB6C1'
                : 'lightgrey',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: selectedDayIndex === index ? 'blue' : 'black',
            }}>
            {item.getDate()}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 5,
          width: 5,
          borderRadius: 2.5,
          backgroundColor:
            current_date.length !== 0 &&
            item.toDateString() === current_date[0].toDateString()
              ? 'green'
              : 'white',
        }}
      />
    </View>
  );

  const handleHeadingPress = () => {
    setShowCalendar(true);
  };

  const handleDayPress = day => {
    const date = new Date(day.dateString);
    setSelectedDate(date);
    setSelectedDayIndex(date.getDay() - 1);
    onDayPress(date.getDay() - 1 > -1 ? date.getDay() - 1 : 0);
    setShowCalendar(false);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const onDayPress = index => {
    timetableRef.current.scrollToIndex({
      index,
      animated: false,
      viewPosition: 0.5,
    });
    setSelectedDayIndex(index);
  };

  const getRandomColor = () => {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const renderTimetableItem = useCallback(({item}) => (
    <View style={styles.timetableClass}>
      {item.sub.map((item, idx) => {
        return (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor:
                item.code.search(/break/i) === -1 ? getRandomColor() : 'white',
              height:
                item.code.search(/break/i) === -1
                  ? Dimensions.get('screen').height * 0.075
                  : Dimensions.get('screen').height * 0.05,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: item.code.search(/break/i) === -1 ? 18 : 14,
                alignSelf: 'center',
              }}>
              {item.code}
            </Text>
            <View
              style={{
                width: Dimensions.get('screen').width * 0.3,
                height: Dimensions.get('screen').width * 0.1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: item.code.search(/break/i) === -1 ? 18 : 14,
                  alignSelf: 'center',
                }}>
                {item.startTime}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: item.code.search(/break/i) === -1 ? 18 : 14,
                  alignSelf: 'center',
                }}>
                -
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: item.code.search(/break/i) === -1 ? 18 : 14,
                  alignSelf: 'center',
                }}>
                {item.endTime}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  ),[])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            justifyContent: 'space-between',
            margin: 5,
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
          <TouchableOpacity
            style={{...styles.arrowContainer, borderRightWidth: 1}}
            onPress={() => {
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() - 7)),
              );
              setSelectedDayIndex(0);
              onDayPress(0);
            }}>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={handleHeadingPress}>
            <Text style={styles.headingText}>
              {moment(generateWeekDates()[0]).format('Do MMM')} -{' '}
              {moment(generateWeekDates()[daysInWeek - 1]).format('Do MMM')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.arrowContainer, borderLeftWidth: 1}}
            onPress={() => {
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() + 7)),
              );
              setSelectedDayIndex(0);
              onDayPress(0);
            }}>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={generateWeekDates()}
          keyExtractor={date => date.toDateString()}
          renderItem={renderDay}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          // onMomentumScrollEnd={event => {
          // scrollToItem={event => {
          // onScroll={event => {
          //   const index = Math.floor(
          //     event.nativeEvent.contentOffset.x /
          //       event.nativeEvent.layoutMeasurement.width,
          //   );
          //   setSelectedDate(generateWeekDates()[index]);
          // }}
        />
        <FlatList
          data={timetableData}
          pagingEnabled={true}
          keyExtractor={item => item.day}
          renderItem={renderTimetableItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          ref={timetableRef}
          onScroll={event => {
            const offset = event.nativeEvent.contentOffset.x;
            const index = Math.round(offset / screenWidth);
            setSelectedDayIndex(index);
          }}
          initialScrollIndex={selectedDayIndex}
          alignItems={'center'}
          // snapToOffsets={snapToOffsets}
          decelerationRate="fast"
          snapToAlignment={'center'}
          snapToInterval={Dimensions.get('screen').width*.8}
          // scrolleventthrottle={2}
        />
        <Modal visible={showCalendar} transparent animationType="slide">
          <View style={styles.modalShadowContainer}>
            <View style={styles.modalContainer}>
              <Calendar onDayPress={handleDayPress} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseCalendar}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  arrow: {
    color: 'black',
    fontSize: 30,
  },
  arrowContainer: {
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  timetableClass: {
    width: Dimensions.get('screen').width * 0.7,
    // width: Dimensions.get('screen').width*.9,
    height: Dimensions.get('screen').height * 0.7,
    margin: Dimensions.get('screen').width * 0.05,
    borderRadius: 8,
  },
  dayContainer: {
    flex: 1,
    width: Dimensions.get('screen').width / 7 - 10,
    margin: 5,
    height: Dimensions.get('screen').height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: (Dimensions.get('screen').width / 7 - 10) / 2,
  },
  modalShadowContainer: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomCalendar;
